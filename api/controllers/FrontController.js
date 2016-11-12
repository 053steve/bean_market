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

}


module.exports = FrontController;