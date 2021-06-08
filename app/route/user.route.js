const controller = require('../controller/user.controller');
const authJwt = require('../middleware/authjwt.middleware');
const verifySignUp = require('../middleware/verifysignup.middleware');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/user/all',[
    authJwt.verifyToken, 
    authJwt.isAdmin,
    ],
    controller.allUsers);

    app.get("/api/user/profile/get",[
    authJwt.verifyToken
    ],
    controller.profile);

    app.post("/api/user/profile/update",[
    authJwt.verifyToken,
    // verifySignUp.checkUpdateDuplicateUsernameOrEmail
    ], 
    controller.update);
    
    app.post("/api/user/search",[
    authJwt.verifyToken,
    authJwt.isAdmin
    ], 
    controller.search)

    app.post("/api/user/update-picture",[
    authJwt.verifyToken
    ],
    controller.profilePicture)

    app.get("/api/get-user/:id",[
        authJwt.verifyToken,
        authJwt.isAdmin
        ], 
        controller.findUserById);
}