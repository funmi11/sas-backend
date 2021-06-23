const db = require("../model");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { role } = require("../model");

var salt = bcrypt.genSaltSync(8);

//signing up an admin

exports.signUpAdmin = (req, res) => {
    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(config.admin,salt)
    }).then((user) => {
        Role.findAll({
            where: {
                name: {
                    [Op.or] : ['admin']
                }
            }
        }).then(role => {
        const token = jwt.sign({id: user.id}, config.secret,{expiresIn: 86400 /*24 hours*/ })
            user.setRoles(role).then(() => {
                res.status(200).send({
                success: true,
                id: user.id,
                firstname: user.firstname,
                middlename: user.middlename,
                lastname: user.lastname,
                email: user.email,
                userName: user.userName,
                password: user.password,
                phoneNumber: user.phoneNumber,
                image: user.image,
                nationality: user.nationality,
                state: user.state,
                dateOfBirth: user.dateOfBirth,
                accessToken: token,
                roles: role,
                message: 'admin registered successfully'
                })
            })
        })
    }).catch(err => {
        res.status(404).send({success: false, message: err.message})
    });
}

//signing up a user

exports.signUpStudent = (req, res) => {
    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,salt)
    }).then((user) => {
        Role.findAll({
            where: {
                name: {
                    [Op.or] : ['student']
                }
            }
        }).then(role => {
        const token = jwt.sign({id: user.id}, config.secret,{expiresIn: 86400 /*24 hours*/ })
            user.setRoles(role).then(() => {
                res.status(200).send({
                    success: true,
                    id: user.id,
                    firstname: user.firstname,
                    middlename: user.middlename,
                    lastname: user.lastname,
                    email: user.email,
                    userName: user.userName,
                    password: user.password,
                    phoneNumber: user.phoneNumber,
                    image: user.image,
                    nationality: user.nationality,
                    state: user.state,
                    dateOfBirth: user.dateOfBirth,
                    accessToken: token,
                    roles: role,
                    jambRegistrationNo: user.jambRegistrationNo,
                    jambId: req.jambId,
                    message: 'user registered successfully',
                })
            })
        })
    }).catch(err => {
        res.status(404).send({success: false, message: err.message})
    });
}

//signing in 

exports.signin = (req, res) => {
    User.findOne({
      where: {
        [Op.or]:[
          {
            username: {[Op.eq]: req.body.param}
          },
          {
            jambRegistrationNo: {[Op.eq]: req.body.param}
          },
          {
            email: {[Op.eq]: req.body.param}
          },
          {
            password: {[Op.eq]: req.body.param}
          }
        ]
      }
    }).then(user => {
      if(!user){
        return res.status(200).send({message: "USER_NOT_FOUND", success: false});
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if(!passwordIsValid){
        return res.status(200).send({
          message: "Invalid Password",
          success: false,
          accessToken: null
        });
      }
        var token = jwt.sign({id: user.id}, config.secret,{
          expiresIn: 86400 //24 hours
        });
        var authorities = [];
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push({'name': roles[i].name});
          }
          res.status(200).send({
            success: true,
            id: user.id,
            firstname: user.firstname,
            middlename: user.middlename,
            lastname: user.lastname,
            email: user.email,
            userName: user.userName,
            password: user.password,
            phoneNumber: user.phoneNumber,
            image: user.image,
            nationality: user.nationality,
            state: user.state,
            dateOfBirth: user.dateOfBirth,
            accessToken: token,
            roles: authorities,
            accessToken: token
          });
        });
        
    }).catch(err => {
      return res.status(404).send({message: err.message, success: false});
    })
}
  
//updating password i.e modifying or changing the password

exports.UpdatePassword = (req, res) => {
    User.findOne({
      where: {
        id: req.userId
      }
    }).then(user => {
      if(!user){
        return res.status(200).send({message: "USER_NOT_FOUND", success: false});
      }
      console.log(req.body.oldPassword);
      console.log(user.password);
      var passwordIsValid = bcrypt.compareSync(
        req.body.oldPassword,
        user.password
      );
      if(!passwordIsValid){
        return res.status(200).send({message: 'Old password is incorrect!!!', success: false});
      }
      User.update({
        // username: user.username,
        // email: user.email,
        // phoneNo: user.phoneNo,
        // firstName: user.firstName,
        // lastName: user.lastName,
        // nationality: user.nationality,
        // address: user.address,
        // image: user.image,
        // jambRegistrationNo: jambRegistrationNo,
        password:  newPassword
      },
      {
        where: {
          id: parseInt(req.userId) /*req.body.userId*/
        }
      })
    }).catch(err => {
        res.status(404).send({message: 'unable to update password', success: false, err: err.message})
    })
}
