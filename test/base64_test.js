'use strict';
var grunt = require('grunt');
var fs = require('fs');

exports.imagemin = {
	
	setUp: function( done ) 
	{
		done();
	},
	
	base64_options: function( test )
	{
		test.expect( 1 );
		test.equal( 1, 1, "random..." );
		test.done();
	}
	
};
