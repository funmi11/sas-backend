const controller = require('../controller/jambResult.controller');
const authJwt = require('../middleware/authjwt.middleware');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/jamb-result/update",[authJwt.verifyToken, authJwt.isStudent], 
    controller.updateJambResult);

    app.get("/api/my-jamb-result",[authJwt.verifyToken, authJwt.isStudent],
    controller.ReadMyJambResult);

    app.get("/api/jamb-result/:id",[authJwt.verifyToken, authJwt.isStudent],
    controller.ReadJambResultById);

    // app.get("/api/jamb-result/delete/:id",[authJwt.verifyToken], 
    // controller.deleteJambResult);
}