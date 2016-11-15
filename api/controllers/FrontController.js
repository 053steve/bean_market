/**
 * FrontController
 *
 * @description :: Server-side logic for managing fronts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var FrontController = {
    Dashboard: function(req, res) {
        return res.view({
            page: 'dashboard',
            view: 'front/dashboard'
        });
    },

    Market: function(req, res) {
        return res.view({
            page: 'market',
            view: 'front/market'
        });
    },

    Profile: function(req, res) {
        return res.view({
            page: 'profile',
            view: 'front/profile'
        });
    },

    MyReceipt: function(req, res) {
        Upload.find().exec(function (err, receipts){
          if (err) {
            return res.serverError(err);
          }

          return res.view({
                page: 'myreceipt',
                view: 'front/myreceipt',
                receipts: receipts
            });
          // var results = [];
          // // assuming openFiles is an array of file names
          //   async.each(receipts, function(receipt, cb) {
          //       var newpath = receipt.path.split("../../assets/");
          //       console.log('newpath ' + newpath[1]);
          //       receipt.newpath = newpath[1];
          //       results.push(receipt)
          //       // Perform operation on file here.
          //       console.log('Processing file ' + JSON.stringify(receipt));

          //       cb()
          //   }, function(err) {
          //       // if any of the file processing produced an error, err would equal that error
          //       if( err ) {
          //         // One of the iterations produced an error.
          //         // All processing will now stop.
          //         console.log('A file failed to process');
          //       } else {
          //         console.log('All files have been processed successfully');
          //       }

          //       return res.view({
          //           page: 'myreceipt',
          //           view: 'front/myreceipt',
          //           receipts: results
          //       });
          //   });          
          
        });
        
    },

    UserReceipt: function(req, res) {
        Upload.find().exec(function (err, receipts){
          if (err) {
            return res.serverError(err);
          }
          var results = [];
          // assuming openFiles is an array of file names
            async.each(receipts, function(receipt, cb) {
                var newpath = receipt.path.split("../../assets/");
                console.log('newpath ' + newpath[1]);
                receipt.newpath = newpath[1];
                results.push(receipt)
                // Perform operation on file here.
                console.log('Processing file ' + JSON.stringify(receipt));

                cb()
            }, function(err) {
                // if any of the file processing produced an error, err would equal that error
                if( err ) {
                  // One of the iterations produced an error.
                  // All processing will now stop.
                  console.log('A file failed to process');
                } else {
                  console.log('All files have been processed successfully');
                }

                return res.view({
                    page: 'userreceipt',
                    view: 'front/userreceipt',
                    receipts: results
                });
            });          
          
        });
        
    },

}


module.exports = FrontController;
