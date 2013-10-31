/*
 * grunt-datauri
 * https://github.com/ceee/grunt-datauri
 *
 * Copyright (c) 2013 Tobias Klika
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt)
{
	var path = require('path');
	var fs = require('fs');
	var childProcess = require('child_process');
	var filesize = require('filesize');
	var datauri = require('datauri');

  // templates to generate CSS classes, placeholder selectors, or variables
	var cssTemplates = {
		scss: '%{{class}} {\n\tbackground-image: url("{{data}}");\n}',
		sass: '%{{class}}\n\tbackground-image: url("{{data}}")',
    sass_no: '.{{class}}\n\tbackground-image: url("{{data}}")',
		default: '.{{class}} {\n\tbackground-image: url("{{data}}");\n}',
		variables: '${{class}}: "{{data}}";'
	};

	// filesize is only critical for IE8
	// as mentioned by Chris Coyier: http://css-tricks.com/data-uris/
	var UNCRITICAL_FILE_SIZE = 32768;



	grunt.registerMultiTask('datauri', 'create base64 encoded data-uris for css from images', function ()
	{
		var options = this.options({
			classPrefix: '',
			classSuffix: '',
			checkFilesize: true,
      usePlaceholder: true,
      variables: false
		});


		this.files.forEach(function(f)
		{
			// filter valid files and map data uri generation
			var data = f.src.filter( fileChecks ).map( generateData );
			var destinationFiles = typeof f.dest === 'string' ? [ f.dest ] : f.dest;
			var css;
			var result = [];

			destinationFiles.forEach(function(dest)
			{
				css = data.map(function(dataObj)
				{
					return generateCss( dest, dataObj );
				}).join('\n\n');

				// Write the destination file.
				grunt.file.write(dest, css);

				result.push( dest );
			});

			grunt.log.writeln('Files [ ' + result.join(', ') + ' ] created');
		});


		// generates a datauri object from file
		// ~~~~~~~~~~~~~~~~~~~~~
		function generateData( filepath )
		{
			var dataObj = new datauri( filepath );

			return {
				data: dataObj.content,
				path: filepath
			};
		}


		// wraps daturi in css class
		// ~~~~~~~~~~~~~~~~~~~~~
		function generateCss( filepath, data )
		{
			var filetype = filepath.split( '.' ).pop().toLowerCase();
			var className;
			var template;

      className = options.classPrefix + path.basename( data.path ).split( '.' )[0] + options.classSuffix;
      filetype = options.usePlaceholder ? filetype : filetype + '_no';

      if (options.variables) 
      {
      	template = cssTemplates.variables;
      } 
      else 
      {
      	template = cssTemplates[ filetype ] || cssTemplates.default;
      }

			return template.replace( '{{class}}', className ).replace( '{{data}}', data.data );
		}


		// Warn on and remove invalid source files (if nonull was set).
		// ~~~~~~~~~~~~~~~~~~~~~
		function fileChecks( filepath )
		{
			// check if file exists
			if (!grunt.file.exists(filepath))
			{
				grunt.log.warn('Source file "' + filepath + '" not found');
				return false;
			}

			if(options.checkFilesize)
			{
				// check for size
				var stats = fs.lstatSync( filepath );

				if(stats.size > UNCRITICAL_FILE_SIZE)
				{
					grunt.log.warn('uncritical datauri size (' + filesize(UNCRITICAL_FILE_SIZE) + ') exceeded: ' + filepath + ' (' + filesize(stats.size) + ')');
				}
			}

			return true;
		}
	});
};
