const db = require('../model');
const ROLES = db.ROLES;
const User = db.user;
const Grade = db.grade;
const Institution = db.institution

//**************************************USER********************************************/
checkDuplicateUsernameOrEmail = (req, res, next) => {
    if(req.body.username){
        User.findOne({
            where: {
                username: req.body.username
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: 'Failed! Username is already in use'
                });
            }
        });
    }

    User.findOne({
        where: {
            email: req.body.email
        }
        
    }).then(user => {
        if(user){
            res.status(400).send({
                message: 'Failed! Email is already in use'
            });
            return;
        }
        next();
    });
};

checkRolesExisted = (req, res, next) => {
    if(req.body.roles){
        for(let i = 0; i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message: 'Failed! Role does not exist = '+ req.body.roles[i] , success: false
                });
                return;
            }
        }
    }
    next();
};


checkUpdateDuplicateUsernameOrEmail = (req, res, next) => {
    User.findAll({
        where: {
            userName: req.body.userName
        }
    }).then(user => {
        if(user.length > 1){
            res.status(400).send({
                message: 'Failed! Username is already in use'
            });
            return;
        }
        else if(user.length == 1){
            if(user[0].id != req.userId){
                res.status(400).send({
                    message: 'Failed! Username is already in use'
                });
                return;
            }
        }
    });

    User.findAll({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(user.length > 1){
            res.status(400).send({
                message: 'Failed! Email is already in use'
            });
            return;
        }
        else if(user.length == 1){
            if(user[0].id != req.userId){
                res.status(400).send({
                    message: 'Failed! Email is already in use'
                });
                return;
            }
        }
    });   
}

//**************************************GRADE********************************************/
checkDuplicateNameOrDescription = (req, res, next) => {
    // if(req.body.name){
        Grade.findOne({
            where: {
                name: req.body.name
            }
        }).then(grade => {
            if (grade) {
                res.status(400).send({
                    message: 'Failed! name is already in use'
                });
            }
        });
    // }

    Grade.findOne({
        where: {
            description: req.body.description
        }
        
    }).then(grade => {
        if(grade){
            res.status(400).send({
                message: 'Failed! description is already in use'
            });
            return;
        }
        next();
    });
};

checkUpdateDuplicateNameOrDescription = (req, res, next) => {
    Grade.findAll({
        where: {
            name: req.body.name
        }
    }).then(grade => {
        if(grade.length > 1){
            res.status(400).send({
                message: 'Failed! name is already in use'
            });
            return;
        }
        else if(grade.length == 1){
            if(grade[0].id != req.gradeId){
                res.status(400).send({
                    message: 'Failed! name is already in use'
                });
                return;
            }
        }
    });

    Grade.findAll({
        where: {
            description: req.body.description
        }
    }).then(grade => {
        if(grade.length > 1){
            res.status(400).send({
                message: 'Failed! description is already in use'
            });
            return;
        }
        else if(grade.length == 1){
            if(grade[0].id != req.gradeId){
                res.status(400).send({
                    message: 'Failed! description is already in use'
                });
                return;
            }
        }
    });   
}
//***********************************INSTITUTION********************************************/
checkDuplicateInstitutionName= (req, res, next) => {
    Institution.findOne({
        where: {
            name: req.body.name
        }
    }).then(institution => {
        if (institution) {
            res.status(400).send({
                message: 'Failed! name is already in use'
            });
        }
    });
};

checkUpdateDuplicateInstitutionName = (req, res, next) => {
    Institution.findAll({
        where: {
           name: req.body.name
        }
    }).then(institution => {
        if(institution.length > 1){
            res.status(400).send({
                message: 'Failed! institution name is already in use'
            });
            return;
        }
        else if(institution.length == 1){
            if(institution[0].id != req.institutionId){
                res.status(400).send({
                    message: 'Failed! institution name is already in use'
                });
                return;
            }
        }
    });
}
const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted,
    checkUpdateDuplicateUsernameOrEmail: checkUpdateDuplicateUsernameOrEmail,
    checkDuplicateNameOrDescription: checkDuplicateNameOrDescription,
    checkUpdateDuplicateNameOrDescription: checkUpdateDuplicateNameOrDescription,
    checkDuplicateInstitutionName: checkDuplicateInstitutionName,
    checkUpdateDuplicateInstitutionName : checkUpdateDuplicateInstitutionName
};
module.exports = verifySignUp;