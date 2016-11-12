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

    Archive: function(req, res) {
        return res.view({
            page: 'archive',
            view: 'front/archive'
        });
    }

}


module.exports = FrontController;
