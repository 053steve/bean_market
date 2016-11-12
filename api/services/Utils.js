var fs = require('fs');

Utils = {
		// check if object is in array.
		// If it is it will take out array and return object in array
		formatArrayObject: function(obj){
				if(obj instanceof Array){
						return obj[0];
				}else{
					return obj;
				}
		},

		parseNFormat: function(obj) {
				var parsedObj = JSON.parse(obj);
				if(parsedObj instanceof Array){
						return parsedObj[0];
				}else{
					return parsedObj;
				}
		},

		getQueryStringFromUrl: function(sURL){
				if (sURL.indexOf("?") > 0)
		    {
		        var arrParams = sURL.split("?");		        
		        return '?' + arrParams[1]
		        
		    }
		},

		parseNFormatRoomType: function(obj){
				var roomTypeObj = this.parseNFormat(obj);
				roomTypeObj.room_price = parseInt(roomTypeObj.room_price) || 0;
				roomTypeObj.room_sale_price = parseInt(roomTypeObj.room_sale_price) || 0;

				return roomTypeObj;

		},

		existy: function(obj) {


			 if(typeof obj === 'undefined' || typeof obj === undefined || obj === 'undefined' || obj === undefined || obj == null || obj == "" ){
				 		console.log('obj undefined ' + JSON.stringify(obj));
				 		return false;
			}else if(typeof obj[0] === 'undefined' || obj[0] == null || obj[0] == "" || obj.length <= 0) {
				 		console.log('obj array undefined ' + JSON.stringify(obj));
				 		return false;
			} else {
					 return true;
			}

		},

	toType: function(obj) {
	  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	},

	tagInputFormat: function(tags) {
	    // console.log('tags is ' + JSON.stringify(tags));

	    if (tags.length !== 0) {
	        var tagNames = [];
	        for (i = 0; i <= tags.length; i++) {
	            var title = tags[i].title;
	            tagNames.push(title);
	            if (tagNames.length === tags.length) {
	                var format_tag = tagNames.join();
	                return format_tag;
	            }
	        }
	    }
		 return tags;
	},

	getJSONCurrencies: function(cb) {
			// get currencies from external json file			
			fs.readFile(sails.config.myconf.currencies, 'utf8', function (err, jsonCurrencies) {				
				cb(jsonCurrencies);			  
			});
	},

	getWebContents: function(cb) {
			// get currencies from external json file			
			fs.readFile(sails.config.myconf.contents, 'utf8', function (err, webContents) {				
				
				var jsonContents = JSON.parse(webContents);				
				cb(jsonContents);			  
			});
	},

	getEmailSettings: function(cb){
			fs.readFile(sails.config.myconf.emailConfig, 'utf8', function (err, emailConfig) {				
				
				var jsonContents = JSON.parse(emailConfig);				
				cb(jsonContents);			  
			});
	},

	getSettings: function(cb) {
			Setting.find().exec(function(err, arrSetting){
					var setting = arrSetting[0]
					cb(setting);
			});
	},

	no_slash_trail: function (url){
    	return url.replace(/\/$/, "");			
	},
	

  calculateDiscount: function(coupon, total) {
      // var coupon = this._toJSONObject(this.storage.getItem(this.cartCoupon));
      // var total = this.storage.getItem(this.total);
      var discount_num = coupon.discount_num;
      var coupon_type = coupon.coupon_type;

      
      // calculate percentage
      var discount_num = parseInt(discount_num);
      var total = parseInt(total);
      discountTotal = (discount_num / 100) * total;

      total = total - discountTotal;
      // console.log('total ' + total);
      return Math.round(total);

  },

  mergeImgArr: function(feature, gallery) {
  		
  		var arrImg = [];
  		if(feature)
  			arrImg.push(feature);  		

  		if(gallery)
  			arrImg = _.union(arrImg, gallery);
  		  		
  		return arrImg


  },

  isAdmin: function(user){
  		if(user.role === 'ADMIN')
  			return true;
  }



};


module.exports = Utils;
