// /**
// * Tour.js
// *
// * @description :: TODO: You might write a short summary of how this model works and what it represents here.
// * @docs        :: http://sailsjs.org/#!documentation/models
// */

// function deleteCat(tour, cb){
//     var isSuccess = false;
//     if(tour.categories.length !== 0) {
//         Tour.findOne({id: tour.id})
//             .populate('categories')
//             .exec(function(err, tour){
//                   async.each(tour.categories, function(category, cb){
//                       tour.categories.remove(category.id);
//                       tour.save(function(err){
//                           return cb();
//                       })
//                   }, function(err){
//                       isSuccess = true;
//                       cb(isSuccess);

//                   });
//             });

//     }else{
//         isSuccess = true;
//         cb(isSuccess)
//     }

// }

// function deleteTag(tour, cb) {
//     var isSuccess = false;
//     if(tour.tags.length !== 0){
//         Tour.findOne({id: tour.id})
//             .populate('tags')
//             .exec(function(err, tour){
//                 async.each(tour.tags, function(tag, cb){
//                     tour.tags.remove(tag.id);
//                     tour.save(function(err){
//                         return cb();
//                     })
//                 }, function(err){
//                     isSuccess = true;
//                     cb(isSuccess);

//                 });

//             });

//     } else {
//         isSuccess = true;
//         cb(isSuccess)
//     }
// }

// function deleteGal(tour, cb){
//      var isSuccess = false;
//      if(tour.gallery_img.length !== 0){
//          Tour.findOne({id: tour.id})
//              .populate('gallery_img')
//              .exec(function(err, tour){
//                   async.each(tour.gallery_img, function(img, cb){
//                       tour.gallery_img.remove(img.id);
//                       tour.save(function(err){
//                           return cb();
//                       })
//                   }, function(err){
//                       isSuccess = true;
//                       cb(isSuccess);

//                   });

//              });

//      } else {
//        isSuccess = true;
//        cb(isSuccess);
//      }
// }



// Tour = {
//   // schema: true,

//   attributes: {
//     title : { type: 'string', required: true },
//     description : { type: 'text' },
//     price : { type: 'number'},
//     sale_price : { type: 'number'},
//     rating : { type: 'number', defaultsTo: 0, integer:true },
//     testimonial : { type: 'json' },
//     createdBy : { model: 'User' },
//     tags : { collection: 'Tag', via: 'tours' },
//     categories : { collection: 'Category', via: 'tours' },
//     what_we_offer : { type: 'json' },
//     feature_img : { model: 'Upload'},
//     gallery_img : { collection: 'Upload'},
//     company: { model: 'Company'},
//     bookings: {collection: 'Trip', via: 'tours'},
//     duration_day: {type: 'int', defaultsTo: null},
//     duration_hours : { type: 'int', defaultsTo: null},
//     location_region : { type: 'string'},
//     location_country : { type: 'string'},
//     sku : { type: 'string'},
//     startTime : { type: 'json'},
//     price_currency : { type: 'json'},    
//     getPrice : function(){                
        
//         var current_price = this.sale_price ? this.sale_price : this.price;  
//         return this.price_currency.currencySymbol + current_price;
//     },   
//     getCurPrice : function(){             
//         return this.sale_price ? this.sale_price : this.price;          
//     }   
//   },


//   beforeCreate: function(values, next){
      
//       Utils.getSettings(function(settings){          
//           values.price_currency = settings.currency;
//           next();            
//       });
    
//   },

//   beforeValidate: function(values, next){
      
//       if(values.title){ // wierd error, check if values object does not contain only feature_img by checking the title in obj. (since title is a required field)

//         // convert int that look like strings into numbers
//         values.price = (values.price) ? parseInt(values.price) : null;      
//         values.sale_price = (values.sale_price) ? parseInt(values.sale_price) : null;
//         values.rating = (values.rating) ? parseInt(values.rating) : 0;
//       }

//       next();            
//   },


//   beforeDestroy: function(values, cb) {
//       Tour.findOne({id: values.where.id })
//           .populateAll()
//           .exec(function(err, tour){

//               async.parallel({
//                   deleteCat: function(cb){
//                       deleteCat(tour, function(isSuccess){
//                           if(isSuccess){
//                               cb(null);
//                           }
//                       });
//                   },
//                   deleteTag: function(cb){
//                       deleteTag(tour, function(isSuccess){
//                           if(isSuccess){
//                               cb(null);
//                           }
//                       });

//                   },
//                   deleteGal: function(cb){
//                       deleteGal(tour, function(isSuccess){
//                           if(isSuccess){
//                             cb(null);
//                           }

//                       });
//                   }
//               },
//               function(err, results) {
//                   cb();
//               });

//           });
//   }
// };

// module.exports = Tour
