/*
 * grunt-base64
 * https://github.com/ceee/grunt-base64
 *
 * Copyright (c) 2013 Tobias Klika
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    
    clean: {
      test: ['tmp']
    },
    
    nodeunit: {
      tasks: ['test/*_test.js']
    },
    
    // Configuration to be run (and then tested).
    base64: {
      default: {
				options: {
					test: true
				},
				src: [
					"test/fixtures/test-png.png",
					"test/fixtures/test-gif.gif",
					"test/fixtures/test-jpg.jpg",
					"test/fixtures/test-bmp.bmp"
				],
				dest: "tmp/base64.css"
			}
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  grunt.registerTask('mkdir', grunt.file.mkdir);
  
  grunt.registerTask('test', [ 'clean', 'mkdir:tmp', 'nodeunit', 'clean' ]);
  
  grunt.registerTask('default', [ 'test', 'base64' ]);
};
