/*
 * grunt-base64
 * https://github.com/ceee/grunt-base64
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

	grunt.registerMultiTask('base64', 'create base64 encoded data-uris for css from images', function ()
	{
		var options = this.options({
			
		});

    
    this.files.forEach(function(f) 
    {
      // filter valid files and map data uri generation
      var data = f.src.filter( fileExists ).map( generateDataUri ).join('\n');
			
      // Write the destination file.
      grunt.file.write(f.dest, data);
      
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
    
    
    // generates a datauri object from file
    // ~~~~~~~~~~~~~~~~~~~~~
    function generateDataUri( filepath )
		{
			var dataObj = new datauri( filepath );

			return dataObj.getCss();
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
