const controller = require('../controller/exam.controller');
const authJwt = require('../middleware/authjwt.middleware');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/exam",
    [authJwt.verifyToken, authJwt.isStudent], 
    controller.createExam);

    app.get("/api/list-exam", [authJwt.verifyToken, authJwt.isStudent], controller.getExams);
}