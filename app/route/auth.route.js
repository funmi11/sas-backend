const controller = require('../controller/auth.controller');
const authJwt = require('../middleware/authjwt.middleware');
const verifySignUp = require('../middleware/verifysignup.middleware');


module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.post('/api/auth/signup-admin',
    [
        // authJwt.verifyToken, 
        // authJwt.isAdmin, 
        verifySignUp.checkDuplicateUsernameOrEmail
    ],
    controller.signUpAdmin);

    app.post('/api/auth/signup-student',[verifySignUp.checkDuplicateUsernameOrEmail
        // authJwt.activeJambSession
    ], controller.signUpStudent);

    app.post('/api/auth/signin',
    [/*[authJwt.isUserOrAdmin],*/], 
    controller.signin);

    app.post('/api/auth/UpdatePassword',
    [
    authJwt.verifyToken
    ],
    controller.UpdatePassword);
}