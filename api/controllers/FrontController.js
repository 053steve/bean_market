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
        Upload.find().exec(function (err, uploads){
          if (err) {
            return res.serverError(err);
          }
          console.log(uploads);
          return res.view({
                page: 'myreceipt',
                view: 'front/myreceipt'
            });
        });
        
    },

    UserReceipt: function(req, res) {
        return res.view({
            page: 'userreceipt',
            view: 'front/myreceipt'
        });
    },

}


module.exports = FrontController;
