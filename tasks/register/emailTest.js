var Sails = require('sails');

module.exports = function (grunt) {
	grunt.registerTask('emailTest', 'test email', function(){
				var done = this.async();
				Sails.lift(function(){						
						EmailService.sendInvoice(function(){
								done();							
						});						
				});				
		});
};


