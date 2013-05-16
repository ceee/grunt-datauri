'use strict';

var grunt = require('grunt');
var fs = require('fs');

exports.datauri = {
	
	setUp: function( done ) 
	{
		done();
	},
	
	main_options: function( test )
	{
		test.expect( 3 );
		
		var file = grunt.file.read;
		
		test.equal( file( "tmp/base64.css" ), file( "test/expected/base64.css" ), "CSS should be equal." );
		test.equal( file( "tmp/base64.scss" ), file( "test/expected/base64.scss" ), "SCSS should be equal." );
		test.equal( file( "tmp/base64.sass" ), file( "test/expected/base64.sass" ), "SASS should be equal." );
		
		test.done();
	}
	
};
