UploadService = {
    fileUploadManager: function(req, postTypeObj, postType, cb) {
        var fromFunction = 'fileUploadManager';
        getObjWImages(postTypeObj, postType, function(resultObj) { //get postTypeObj with associated images
            async.parallel({
                uploadFeatImg: function(cb) {
                    var feature_img = req.param('feature_img');
                    if (feature_img) {
                        updateFeatImg(postTypeObj, postType, feature_img, fromFunction, function(resultObj) {
                            cb(null, resultObj);
                        });
                    } else {
                        cb(null, resultObj);
                    }

                },
                uploadGallery: function(cb) {

                    var gallery_img = req.param('gallery_img');

                    if (Utils.existy(gallery_img)) {
                        updateGallery(postTypeObj, postType, gallery_img, fromFunction, function(resultObj) {
                            cb(null, resultObj);
                        });

                    } else {
                        cb(null, resultObj);
                    }

                }
            }, function(err, results) {
                cb(postTypeObj);
            });
        });

    },

    associateImportImg: function(uploadObj, postTypeObj, postType, cb) {
        var fromFunction = 'associateImportImg';
        getObjWImages(postTypeObj, postType, function(resultObj) { //get postTypeObj with associated images
            async.parallel({
                uploadFeatImg: function(cb) {
                    var feature_img = uploadObj.featDir;
                    if (feature_img) {
                        updateFeatImg(postTypeObj, postType, feature_img, fromFunction, function(resultObj) {
                            cb(null, resultObj);
                        });
                    } else {
                        cb(null, resultObj);
                    }

                },

                uploadGallery: function(cb) {

                    var gallery_img = uploadObj.galleryDir;

                    if (!_.isEmpty(gallery_img)) {
                        updateGallery(postTypeObj, postType, gallery_img, fromFunction, function(resultObj) {
                            cb(null, resultObj);
                        });

                    } else {
                        cb(null, resultObj);
                    }

                }
            }, function(err, results) {
                cb(postTypeObj);
            });
        });

    },
};


function updateGallery(postTypeObj, postType, gallery_img, fromFunction, cb) {

    if (fromFunction === 'fileUploadManager') {
        gallery_img = gallery_img.toString();
        var arrImgId = gallery_img.split("|");
    } else {

        var arrImgId = [];
        gallery_img.forEach(function(objGal){
        		arrImgId.push(objGal.id);
        });

    }


    if (postType === 'tour') {
        // value of image id came as string, must split into array first
        Tour
            .findOne({
                id: postTypeObj.id
            })
            .exec(function(err, tour) {
                async.each(arrImgId, function(image_id, cb) {
                    Upload
                        .findOne({
                            id: image_id
                        })
                        .exec(function(err, file) {
                            tour.gallery_img.add(file);
                            tour.save();
                            cb();
                        });

                }, function(err) {
                    if (err) {
                        console.log(JSON.stringify(err));
                    }
                    
                    cb(tour);

                });
            });

    } else if (postType === 'hotel') {
        Hotel
            .findOne({
                id: postTypeObj.id
            })
            .exec(function(err, hotel) {
                async.each(arrImgId, function(image_id, cb) {
                    Upload
                        .findOne({
                            id: image_id
                        })
                        .exec(function(err, file) {
                            hotel.gallery_img.add(file);
                            cb();
                        });

                }, function(err) {
                    if (err) {
                        console.log(JSON.stringify(err));
                    }
                    hotel.save();
                    cb(hotel);

                });
            });
    } else {
        console.log('cannot find postType');
        cb(postTypeObj);
    }
}

function updateFeatImg(postTypeObj, postType, feature_img, fromFunction, cb) {
    if (postType === 'tour') {
        Tour.update({
            id: postTypeObj.id
        }, {
            feature_img: feature_img
        }).exec(function(err, tour) {
            cb(tour);
        });

    } else if (postType ==='hotel') {
        console.log("feature img is " + JSON.stringify(feature_img));
        Hotel.update({
            id: postTypeObj.id
        }, {
            feature_img: feature_img
        }).exec(function(err, hotel) {
            console.log('updateFeatImg err is ' + JSON.stringify(err));
            console.log('updateFeatImg hotel is ' + JSON.stringify(hotel));
            cb(hotel);
        });

    } else {

        console.log('cannot find postType');
        cb(postTypeObj);

    }

}

function getObjWImages(postTypeObj, postType, cb) {
    //associate postTypeObj for each postType
    if (postType === 'tour') {
        Tour.findOne({
            id: postTypeObj.id
        })
            .populate('feature_img')
            .populate('gallery_img')
            .exec(function(err, tour) {
                cb(tour);
            });
    } else if (postType === 'hotel') {
        Hotel.findOne({
            id: postTypeObj.id
        })
            .populate('feature_img')
            .populate('gallery_img')
            .exec(function(err, hotel) {
                cb(hotel);
            });

    } else {
        console.log('cannot find postType');
        cb(postTypeObj);
    }

}



module.exports = UploadService;