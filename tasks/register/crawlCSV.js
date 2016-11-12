var Sails = require('sails');

module.exports = function (grunt) {
	grunt.registerTask('crawlCSV', 'import and populate tour csv', function(){
				var done = this.async();

				Sails.lift(function(){						
						crawlCSV_service.start(function(){
								done();							
						});						
				});				
		});
};


