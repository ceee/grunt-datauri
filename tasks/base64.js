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

	grunt.registerMultiTask('base64', 'create base64 encoded data-uris for css from images', function ()
	{
		var options = this.options();
	});
};
