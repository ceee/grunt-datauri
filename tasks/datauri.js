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
	
	var cssTemplates = {
		scss: '%{{class}} {\n\tbackground-image: url(\'{{data}}\');\n}',
		sass: '%{{class}}\n\tbackground-image: url(\'{{data}}\')',
		default: '.{{class}} {\n\tbackground-image: url(\'{{data}}\');\n}'
	};

	grunt.registerMultiTask('datauri', 'create base64 encoded data-uris for css from images', function ()
	{
		var options = this.options({});

    
    this.files.forEach(function(f) 
    {
      // filter valid files and map data uri generation
      var data = f.src.filter( fileExists ).map( generateData );
      var destinationFiles = typeof f.dest === 'string' ? [ f.dest ] : f.dest;
      var css;
			
      destinationFiles.forEach(function(dest)
      {
      	css = data.map(function(base64)
				{
					return generateCss( dest, base64 );
				}).join('\n\n');
				
				// Write the destination file.
				grunt.file.write(dest, css);
				
				grunt.log.writeln('File "' + dest + '" created.');
      });
    });
    
    
    // generates a datauri object from file
    // ~~~~~~~~~~~~~~~~~~~~~
    function generateData( filepath )
		{
			var dataObj = new datauri( filepath );
			var base64 = dataObj.content;
			
			return base64;
		}
		
		
		// wraps daturi in css class
    // ~~~~~~~~~~~~~~~~~~~~~
    function generateCss( filepath, data )
		{
			var filetype = filepath.split( "." ).pop().toLowerCase();
			var template = cssTemplates[ filetype ] || cssTemplates.default;
			
			return template.replace( '{{class}}', 'cls' ).replace( '{{data}}', data );
		}
		
		
    // Warn on and remove invalid source files (if nonull was set).
    // ~~~~~~~~~~~~~~~~~~~~~
		function fileExists( filepath )
		{
			if (!grunt.file.exists(filepath)) 
			{
				grunt.log.warn('source file "' + filepath + '" not found.');
				return false;
			} 
			
			return true;
		}
  });
};
