const controller = require('../controller/olevel.controller');
const authJwt = require('../middleware/authjwt.middleware');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/olevel/update",[authJwt.verifyToken, authJwt.isStudent], controller.updateOlevelResult);

    app.get("/api/my-olevel", [authJwt.verifyToken, authJwt.isStudent], controller.ReadMyOlevelResult);

    app.get("/api/olevel/:id", [authJwt.verifyToken, authJwt.isStudent], controller.ReadOlevelResultById);

    // app.get("/api/olevel/delete/:id", controller.deleteOlevelResult);
}