// /**
//  * FrontController
//  *
//  * @description :: Server-side logic for managing fronts
//  * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
//  */

// // var limit = 0;
// var limit = 10; //uncomment this when finish testing
// var skip = 0;



// function paginate_tours(where, cb) {

//     Tour
//         .count(where)
//         .exec(function(err, found) {

//             var page_num = parseInt(found / limit); // need number of pages
//             var page_left = parseInt(found % limit); // find remainder
//             // console.log('found is ' + found);
//             // console.log('limit is ' + limit);
//             var pagination = {
//                 pageCount: page_num
//             }

            
//             if (page_left !== 0) // if has ramainder
//                 pagination.pageCount = page_num + 1;            

//             cb(pagination);
            
//         });
// }

// function filter_options(where, cb) {
//     async.parallel({
//         tourCount: function(cb) {
//             Tour
//             .count(where)
//             .exec(function(err, found) {                           
//                 cb(null, found)
//             });   
//         },
//         tourCategories: function(cb) {
//             Category
//             .find()
//             .then(function(allcats){
//                 //take out the default uncategorized
//                 allcats = allcats.filter(function(el) { return el.title != "Uncategorized"; });                
//                 cb(null, allcats)
//             });
//         },

//         tourTags: function(cb){
//             Tag
//             .find()
//             .then(function(alltags){
//                 cb(null, alltags)
//             });
//         },
//         priceRange: function(cb){
//             var priceRangeObj = {};
//             Tour.find().min('price').then(function(minPrice){                
//                 priceRangeObj.minPrice = minPrice[0].price //add minPrice to priceRange
//                 Tour.find().max('price').then(function(maxPrice){
//                     priceRangeObj.maxPrice = maxPrice[0].price; //add minPrice to priceRange
//                     cb(null, priceRangeObj);
//                 });
                
//             });
//         },
        
//     }, function(err, filterOptions) {        
//         // console.log(JSON.stringify(filterOptions));
//         cb(filterOptions);
//     });
    
// }


// var FrontController = {
//     Home: function(req, res) {
//         Utils.getWebContents(function(contents) {
//             Tour
//                 .find()
//                 .limit(6)
//                 .populate('feature_img')
//                 .exec(function(err, tours) {
//                     // console.log(tours);
//                     return res.view({
//                         page: 'home',
//                         view: 'home',
//                         contents: contents,
//                         tours: tours
//                     });
//                 });


//         });


//     },

//     Activities: function(req, res) {

//         // 1. Get all queries param
//         var allParams = req.allParams();        
//         var queryString = Utils.getQueryStringFromUrl(req.url);
//         // console.log('queryString ' + queryString);
        
//         // 2. take out tags and categories in params for query
//         var pageIndex = (_.get(_.pick(allParams, 'page'),'page')) ? (_.get(_.pick(allParams, 'page'),'page')) : 1; //get page index out of object        
//         var associationParams = _.pick(allParams, ['cat', 'tag']);
//         var tourParams = _.omit(allParams, ['cat', 'tag', 'page']);        


//         // 3. get association if it is in query

//         async.parallel({
//             tourFromTag: function(cb) {
//                 if (_.has(associationParams, 'tag')) {
//                     // console.log('tag is ' + associationParams.tag);
//                     var tags = _.get(associationParams,'tag');
//                     arrTags = tags.split(',');                                        

//                     Tag
//                         .find({
//                             title: arrTags
//                         })
//                         .populate('tours')
//                         .then(function(toursFromTag) {
//                             // console.log(JSON.stringify(toursFromTag));
//                             var arrTourIds = [];                            
//                             _.forEach(toursFromTag, function(value) {
//                                 _.forEach(value.tours, function(value){
//                                     arrTourIds.push(value.id);
//                                 });                            
//                             });
//                             // console.log(arrTourIds);                            
//                             cb(null, arrTourIds);
//                         })
//                         .catch(function(err){
//                             console.log('err ' + err);
//                             cb(null);
//                         });
//                 } else {
//                     cb(null);
//                 }

//             },
//             tourFromCat: function(cb) {
//                 if (_.has(associationParams, 'cat')) {
//                     var cats = _.get(associationParams,'cat');
//                     arrCats = cats.split(',');                    
//                     Category
//                         .find({
//                             title: arrCats
//                         })
//                         .populate('tours')
//                         .then(function(toursFromCat) {
//                             var arrTourIds = [];
//                             // console.log("toursFromCat " + JSON.stringify(toursFromCat));                           
//                             _.forEach(toursFromCat, function(value) {
//                                 _.forEach(value.tours, function(value){
//                                     arrTourIds.push(value.id);
//                                 });                                
//                             });
//                             cb(null, arrTourIds);
//                         })
//                         .catch(function(err){
//                             cb(null);
//                         });
//                 } else {
//                     cb(null);
//                 }

//             },

//         }, function(err, results) {            

//             var mergeTourResults = (results.tourFromCat) ? _.merge(results.tourFromCat, results.tourFromTag) : _.merge(results.tourFromTag, results.tourFromCat);            

//             if (mergeTourResults) { //if has associations
//                 tourParams.id = mergeTourResults //add associated id to tourParams    
//             }
            
//             // var testParams1 = {
//             //     $and: [
//             //         { id: ['57747324ebce77a01103d44d','57747324ebce77a01103d40d']},
//             //         { location_region: { contains: 'chiangmai' } },                                
//             //         { price: {'>=': 0} },                                
//             //         { price: {'<=': 3000} }
//             //     ]
//             // }        

//             //4. transform waterline query
//             var where = _.transform(tourParams, function(result, val, key) {
//                 if (key == 'id') {
//                     result.$and.push(_.set({}, 'id', val));
//                 } else if (key == 'min_price') {
//                     result.$and.push(_.set({}, 'price', {
//                         '>=': parseInt(val)
//                     }));
//                 } else if (key == 'max_price') {
//                     result.$and.push(_.set({}, 'price', {
//                         '<=': parseInt(val)
//                     }));
//                 } else {
//                     result.$and.push(_.set({}, key, {
//                         contains: val
//                     }));
//                 }
//             }, {
//                 $and: []
//             });
            

//             where = _.get(where, '$and.[0]') ? where : {};            
            
//             var remain = parseInt(pageIndex) - 1;
//             skip = parseInt(remain) * limit;            

//             Tour
//                 .find(where)
//                 .sort('id DESC')
//                 .skip(skip)
//                 .limit(limit)
//                 .populate('feature_img')
//                 .exec(function(err, tours) {                    
//                     paginate_tours(where, function(pagination) {                        
//                         filter_options(where, function(filterOptions){
//                             pagination.page = pageIndex;                        
//                             Utils.getWebContents(function(contents) {                                
                                
//                                 return res.view({
//                                     page: 'tours',
//                                     tours: tours,
//                                     view: 'tours',
//                                     pagination: pagination,
//                                     filterOptions: filterOptions,
//                                     contents: contents,
//                                     queryString: queryString
//                                 });

//                             });
    
//                         })
                        
//                     });                    

//                 });

//         });
//     },  

//     About: function(req, res) {
//         Utils.getWebContents(function(contents) {
//             return res.view({
//                 view: 'about',
//                 contents: contents
//             });
//         });

//     },

//     Contact: function(req, res) {
//         Utils.getWebContents(function(contents) {
//             return res.view({
//                 page: 'contact',
//                 view: 'contact',
//                 contents: contents
//             });
//         })

//     },

//     Single_Activity: function(req, res) {
//         Tour
//             .findOne({
//                 id: req.param('id')
//             })
//             .populateAll()
//             .exec(function(err, tour) {
//                 tour.getPrice = tour.getPrice();
//                 tour.getCurPrice = tour.getCurPrice();

//                 Setting.find().exec(function(err, arrSetting) {
//                     var setting = arrSetting[0]; //get first setting in list
//                     var currency = setting.currency

//                     var arrImg = Utils.mergeImgArr(tour.feature_img, tour.gallery_img);
//                     tour.arrImg = arrImg;
//                     Utils.getWebContents(function(contents) {
//                         // console.log(tour);                        

//                         // console.log(tour.price);
//                         return res.view({
//                             currency: currency,
//                             tour: tour,
//                             view: 'single',
//                             contents: contents
//                         });
//                     });

//                 });
//                 // console.log(JSON.stringify(tour));

//             });
//     },

//     Review_booking: function(req, res) {
//         Utils.getWebContents(function(contents) {
//             return res.view({
//                 page: 'reviewbooking',
//                 view: 'review_booking',
//                 contents: contents,
//             });
//         });

//     },

//     Passenger_info: function(req, res) {
//         Utils.getWebContents(function(contents) {
//             return res.view({
//                 page: 'passengerinfo',
//                 view: 'passenger_info',
//                 contents: contents,
//             });
//         });

//     },

//     Passenger_register: function(req, res) {
//         Utils.getWebContents(function(contents) {
//             return res.view({
//                 page: 'passengerinfo',
//                 view: 'passenger_register',
//                 contents: contents,
//             });
//         });

//     },

//     Payment: function(req, res) {
//         Utils.getWebContents(function(contents) {

//             Utils.getSettings(function(setting) {
//                 return res.view({
//                     page: 'payment',
//                     view: 'payment',
//                     payment: setting.payment,
//                     currency: setting.currency,
//                     contents: contents,
//                 });
//             });

//         });
//     },

//     ComingSoon: function(req, res) {
//         Utils.getWebContents(function(contents) {

//             return res.view({
//                 page: 'comingsoon',
//                 layout: 'coming-soon',
//                 view: 'comingsoon',
//                 contents: contents,
//             });

//         });

//     },

//     Thankyou: function(req, res) {
//         // booking examaple
//         // 5774ecb449e21afb176adcbe
//         if (req.param('bookingId')) {
//             BookingService.getTripsByBookingId(req.param('bookingId'), function(booking) {
//                 Utils.getWebContents(function(contents) {
//                     Utils.getSettings(function(setting) {
//                         // format bookings object for thankyou page, dont want user to know everything
//                         var arrBookingField = [];
//                         var arrTrips = [];
//                         arrBookingField.push({
//                             f_name: 'Booking ID',
//                             value: booking.order_number
//                         });
//                         arrBookingField.push({
//                             f_name: 'Name',
//                             value: booking.book_by.getName()
//                         });
//                         arrBookingField.push({
//                             f_name: 'Email',
//                             value: booking.book_by.email
//                         });
//                         arrBookingField.push({
//                             f_name: 'Total Price',
//                             value: setting.currency.currencySymbol + booking.total_price
//                         });
//                         arrBookingField.push({
//                             f_name: 'Payment Type',
//                             value: booking.payment_type
//                         });
//                         arrBookingField.push({
//                             f_name: 'Customer Notes',
//                             value: booking.customer_notes
//                         });
//                         return res.view({
//                             page: 'thankyou',
//                             view: 'thankyou',
//                             currency: setting.currency,
//                             contents: contents,
//                             booking: arrBookingField,
//                             trips: booking.trips

//                         });

//                     });

//                 });
//             });

//         } else {
//             return res.notFound();
//         }

//     },

//     applycoupon: function(req, res) {
//         Coupon.findOne({
//             coupon_code: req.param('coupon_code')
//         }).exec(function(err, coupon) {
//             if (err) {
//                 data = {
//                     isSuccess: false,
//                     coupon: err,
//                     msg: err
//                 }
//                 res.send(data)
//             } else {
//                 if (coupon) {
//                     data = {
//                         isSuccess: true,
//                         coupon: coupon,
//                         msg: 'Yeah! Coupon is Applied.'
//                     }
//                     // res.send(data);      
//                 } else {
//                     data = {
//                         isSuccess: false,
//                         coupon: coupon,
//                         msg: 'Coupon not applied, check if the coupon code is correct'
//                     }

//                 }
//                 res.send(data);
//             }

//         });
//     },



//     // Landing: function(req, res) {
//     //      Tag
//     //          .find()
//     //          .limit(25)
//     //          .exec(function(err, tags){
//     //
//     //                  return res.view({
//     //                          tags: tags,
//     //                          page: 'home',
//     //                          layout:'landing',
//     //                          view:'landing'
//     //            });
//     //
//     //          });
//     //
//     // },
//     //
//     //
//     //
//     //

//     //

//     //
//     // Checkout: function(req, res){
//     //      return res.view({
//     //              page: 'checkout',
//     //              view:'checkout'
//     //      });
//     // },
//     //
//     // Order: function(req, res){
//     //      return res.view({
//     //              page:'order',
//     //              view:'order'
//     //      });
//     // },
//     //
//     // Thanks: function(req, res) {
//     //      return res.view({
//     //              view:'thanks'
//     //      });
//     // },

// }


// module.exports = FrontController