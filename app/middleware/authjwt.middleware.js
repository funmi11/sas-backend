const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../model');
const User = db.user;
const Jamb = db.jamb;

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if(!token) {
        return res.status(403).send({
            message: 'No token provided!', success: false
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({
                message : 'unauthorized!', success: false
            })
        }
        req.userId = decoded.id;
        next();
    });
};
activeJambSession = (req,res,next) => {
    Jamb.findOne({
        where: {
            active: true
        }
    }).then(result => {
        req.jambId = result.id;
    }).catch(err => {
        console.log(err);
    })
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        try{
            user.getRoles().then(roles => {
                for(let i = 0; i < roles.length; i++) {
                    if(roles[i].name === 'admin') {
                        next();
                        return;
                    }
                }

                res.status(403).send({
                    message: 'Require Admin Role!', success: false
                });
                return;
            });
        }catch(err){
            res.status(403).send({
                message: 'Admin could not be found!', success: false
            });
            return;
        }
    });
};

isStudent = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        try{
            user.getRoles().then(roles => {
                for(let i = 0; i < roles.length; i++) {
                    if(roles[i].name === 'student') {
                        next();
                        return;
                    }
                }

                res.status(403).send({
                    message: 'Require Student Role!', success: false
                });
                return;
            });
        }catch(err){
            res.status(403).send({
                message: 'Student could not be found!', success: false
            });
            return;
        }
    });
};

isUserOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        try{
            user.getRoles().then(roles => {
                for(let i = 0; i < roles.length; i++){
                    if(roles[i].name === 'user') {
                        next();
                        return;
                    }
                    if(roles[i].name === 'admin') {
                        next();
                        return;
                    }
                }
                res.status(403).send({
                    message: 'Require User or Admin Role!', success: false
                });
            });
        }catch(err){
            res.status(403).send({
                message: 'Couldnt find User or Admin Role!', success: false
            });
            return;
        }
    });
}
const authJwt = {
    verifyToken: verifyToken,
    isAdmin : isAdmin,
    isStudent : isStudent,
    isUserOrAdmin : isUserOrAdmin,
    activeJambSession: activeJambSession
};
module.exports = authJwt;

