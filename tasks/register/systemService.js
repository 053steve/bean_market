var Sails = require('sails');



// module.exports = function (grunt) {
// 	grunt.registerTask('updateTotals', 'calculate and update totals and subtotals of booking', function(){
				
// 				var done = this.async();

// 				Sails.lift(function(){						
// 						FinanceService.updateTotals(function(){
// 								done();							
// 						});						
// 				});				
// 		});
// };


module.exports = function (grunt) {
	grunt.registerTask('currencyUpdate', 'calculate and update totals and subtotals of booking', function(){
				
				var done = this.async();

				Sails.lift(function(){						
						FinanceService.addCurrencyToTours(function(){
								done();							
						});						
				});				
		});
};


