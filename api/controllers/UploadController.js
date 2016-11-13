var fs = require('fs');

/**
 * UploadController
 *
 * @description :: Server-side logic for managing uploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 

 function formatUrl(url) {
     uploadPath = sails.config.myconf.uploadDestination;
     path = uploadPath + url.substr(url.lastIndexOf('/') + 1);

     return path;

 }


var UploadController = {
			
			dropUpload: function(req, res){
				req.file('userPhoto').upload({
		        dirname: sails.config.myconf.uploadDestination,
		        maxBytes: 10000000
		    },

				function (err, file) {									
					console.log('file ' + JSON.stringify(file));
		        if (err) {
		            console.log('err is ' + JSON.stringify(err));
		            //	IF ERROR Return and send 500 error with error
		            // file.upload(function() {});
		            data = {
		                isSuccess: 0,
		                err: 'no file'
		            }
		            return res.send(data);
		        } else if (file.length === 0) {
		            data = {
		                isSuccess: 0,
		                err: 'no file'
		            }
		            return res.send(data);
		        } else {
		           var file = file[0];
							 var path = formatUrl(file.fd);
				       Upload.create({
								 		title: file.filename,
										fd: file.fd,
										path: path
							 }).exec(function(err, upload){
										res.send(upload);

							 });
		        }
		    });					
			}
};

module.exports = UploadController;

