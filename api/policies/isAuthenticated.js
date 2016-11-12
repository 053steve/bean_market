/**
 * isAuthenticated
 * @description :: Policy to inject user in req via JSON Web Token
 */
var passport = require('passport');
var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    
    // if came from same origin check for session instead        
    if (!req.headers.origin || req.headers.origin === sails.config.mainDomain) {
        
        if (req.session.authenticated) {
            return next();
        }
        
        // if user not allowed        
        return res.redirect('/login');
        
    } else {
        

        passport.authenticate('jwt', function(error, user, info) {        
            
            if (error) return res.serverError(error);
            if (!user) {
                return res.unauthorized(null, info && info.code, info && info.message);
            }

            req.user = user;

            next();
        })(req, res);    
        
        
    }

};