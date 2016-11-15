var fs = require('fs-extra');

/**
 * UploadController
 *
 * @description :: Server-side logic for managing uploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 

 function formatUrl(url) {
     uploadPath = sails.config.myconf.uploadDestination;
     path = '/uploads/' + url.substr(url.lastIndexOf('/') + 1);

     return path;

 }


var UploadController = {
			
			dropUpload: function(req, res){
				req.file('userPhoto').upload({
		        dirname: process.cwd() + sails.config.myconf.tempDestination,
		        maxBytes: 10000000
		    },

				function (err, uploadedFiles) {									
					console.log('file ' + JSON.stringify(uploadedFiles));
		        if (err) {
		            console.log('err is ' + JSON.stringify(err));

		            //	IF ERROR Return and send 500 error with error
		            // file.upload(function() {});
		            data = {
		                isSuccess: 0,
		                err: 'no file'
		            }
		            return res.send(data);
		        } else if (uploadedFiles.length === 0) {
		            data = {
		                isSuccess: 0,
		                err: 'no file'
		            }
		            return res.send(data);
		        } else {

		        	 var filename = uploadedFiles[0].fd.substring(uploadedFiles[0].fd.lastIndexOf('/')+1);
               var uploadLocation = process.cwd() + sails.config.myconf.uploadDestination + filename;
               var tempLocation = process.cwd() + sails.config.myconf.tempDestination + filename;
               
               fs.copy(tempLocation, uploadLocation, function (err) {
								  console.log('err is ' + err);
							    
						 			 var path = formatUrl(uploadLocation);
						       Upload.create({
										 		title: filename,
												fd: uploadLocation,
												path: path
									 }).exec(function(err, upload){
												res.send(upload);

									 });
								});
		           
		        }
		    });					
			}
};

module.exports = UploadController;

