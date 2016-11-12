// Handlebars = require('sails/node_modules/express-handlebars/node_modules/handlebars');
// // Handlebars = require('handlebars');

// var helpers = require('handlebars-helpers')({
//   handlebars: Handlebars
// });

// Handlebars.registerHelper('paginate', require('handlebars-paginate'));

// Handlebars.registerHelper('greeting', function() {
// 		return new Handlebars.SafeString( '<i>Hello World</i>' );
// });


// Handlebars.registerHelper('star_rating', function(rating) {
// 		var ret = "";
// 		var rating = parseInt(rating);
// 		if(rating){
// 				for(i=1; i <= rating; i++){

// 						ret = ret + '<i class="fa fa-star colored"></i></a>';
// 						if(i == rating){
// 								return ret;
// 						}
// 				}
// 		}else{
// 			return ret;
// 		}

// });

// Handlebars.registerHelper('excerpt', function(str, limit) {

//   	var excerpt = str.substring( 0, str.lastIndexOf( ' ', limit ) ) + '...';
  	
// 		return excerpt;
// });


// Handlebars.registerHelper('role_name', function(role_id) {
//   	var role_name;
// 		if(role_id){
// 			role_name = 'admin';
// 		}else{
// 			role_name = 'user';
// 		}

// 		return role_name;
// });

// Handlebars.registerHelper('select_joined', function(selected, options) {
	
// });

// Handlebars.registerHelper('select', function(selected, options) {		
//     return options.fn(this).replace(
//         new RegExp(' value=\"' + selected + '\"'),
//         '$& selected="selected"');
// });

// Handlebars.registerHelper('checkLength', function(value, options) {
//     if(!value){
// 				value = 0;
// 		}
// 		return value;
// });

// Handlebars.registerHelper("foreach",function(arr,options) {
//     if(options.inverse && !arr.length)
//         return options.inverse(this);

//     return arr.map(function(item,index) {
//         item.$index = index;
//         item.$first = index === 0;
//         item.$last  = index === arr.length-1;
//         return options.fn(item);
//     }).join('');
// });


// Handlebars.registerHelper('checkboxMatcher', function(id, checkArray, options) {
	

// 	for (var i = 0 ; i <= checkArray.length; i++) {		
// 		if(checkArray[i]){
// 				if(checkArray[i].id === id){
// 						return 'checked'
// 				}
// 		}
// 	}  
  
// });

// // Handlebars.registerHelper('curSelectMatcher', function(joinedCurr, checkArray, options) {
// // 	var arrCurr = joindCurr.split("|")
// // 	var currCode = arrCurr[0];
// // 	if(checkArray[i].code === currCode){
// // 			return 'checked'
// // 	}
	
  
// // });


// Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

//     switch (operator) {
//         case '==':
//             return (v1 == v2) ? options.fn(this) : options.inverse(this);
//         case '===':
//             return (v1 === v2) ? options.fn(this) : options.inverse(this);
//         case '<':
//             return (v1 < v2) ? options.fn(this) : options.inverse(this);
//         case '<=':
//             return (v1 <= v2) ? options.fn(this) : options.inverse(this);
//         case '>':
//             return (v1 > v2) ? options.fn(this) : options.inverse(this);
//         case '>=':
//             return (v1 >= v2) ? options.fn(this) : options.inverse(this);
//         case '&&':
//             return (v1 && v2) ? options.fn(this) : options.inverse(this);
//         case '||':
//             return (v1 || v2) ? options.fn(this) : options.inverse(this);
// 				case 'Or':
// 						var arr = v2.split("|");
// 						var v2 = arr[0];
// 						var v3 = arr[1];
// 						return (v1 == v2 || v1 == v3) ? options.fn(this) : options.inverse(this);

//         default:
//             return options.inverse(this);
//     }
// });

// Handlebars.registerHelper('if_eq', function(a, b, options) {
//     if (a == b) {
//         return options.fn(this);
//     } else {
//         return options.inverse(this);
//     }
// });
