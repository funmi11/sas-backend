const db = require("../model");
const User = db.user;
const Op = db.Sequelize.Op;

exports.allUsers = (req, res) => {
    User.scope('withoutPassword').findAndCountAll({
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(result => {
    res.status(200).send({result:result, success: true});
    }).catch(err => {
    res.status(500).send({message: err.message, success: false});
    })
};

exports.findUserById = (req,res) => {
    User.scope('withoutPassword').findOne({
        where: {
        id: parseInt(req.params.id)
        }
    }).then(result => {
    res.status(200).send({result: result, success: true});
    }).catch(err => {
    res.status(500).send({result: result, success: false});
    })
};

exports.profile = (req,res) => {
    User.scope('withoutPassword').findOne({
        where: {
        id: parseInt(req.userId)
        }
    }).then(result => {
    res.status(200).send({result: result, success: true});
    }).catch(err => {
    res.status(500).send({result: err.message, success: false});
    })
};

exports.update = (req,res) => {
    User.scope('withoutPassword').update({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        image: req.body.image,
        nationality: req.body.nationality,
        state: req.body.state,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        lga:    req.body.lga,
        disability: req.body.disability,
        jambRegistrationNo: req.body.jambRegistrationNo,
        firstCourse: req.body.firstCourse,
        secondCourse: req.body.secondCourse
    },
    {
        where:{
            id: parseInt(req.userId)
        }
    }).then(user => {
        res.status(200).send({result:user,success:true});
    }).catch(err => {
        res.status(500).send({message:err.message,success:false});
    })
};

exports.search = (req,res) => {
    User.scope('withoutPassword').findAll({
        where: {
            [Op.or]: [
                {
                email: {[Op.eq]: req.body.keyword}
                },
                {
                userName: {[Op.eq]: req.body.keyword}
                },
                {
                firstname: {[Op.eq]: req.body.keyword}
                },
                {
                phoneNumber: {[Op.eq]: req.body.keyword}
                },
                {
                lastName: {[Op.eq]: req.body.keyword}
                }
            ]
        }
    }).then(result => {
    res.status(200).send({result: result, success:true});
    }).catch(err => {
    res.status(500).send({message: err.message, success: false});
    })
};

exports.profilePicture = (req, res) => {
    if(req.files['profile'] != undefined){
        User.scope('withoutPassword').update({
        image: req.files['profile'].filename
        },
        {
        where:{
            id: parseInt(req.userId)
        }
        }).then(result => {
            User.findOne({
                where: {
                id: parseInt(req.userId)
                }
            }).then(user => {
                res.status(200).send({
                result:user,
                success:true,
                update: result
                });
            }).catch(err => {
                res.status(500).send({message:err.message,success:false});
            });
        }).catch(err => {
        res.status(500).send({message:err.message,success:false});
        })
    }
};
  