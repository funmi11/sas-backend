const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require('./app/config/auth.config');

const db = require('./app/model');
const Role = db.role;
const User = db.user;
const Subject = db.subject;
const Jamb = db.jamb;
// const seeding = require('./app/config/seeding');

const app = express();

const corsOption = {
    origin: 'http://localhost:8080',
    // origin: 'https://www.sas-web.codetechweb.com',
    'Access-Control-Allow-Origin': 'http://localhost:8080',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
};

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// const { admin } = require('./app/config/auth.config');


db.sequelize.sync();
// db.sequelize.sync({force: true}).then(() =>{
//     console.log('Drop and Resync Database with {force: true}');
//     createRoles();
//     createSubject();
//     createAdmin();
//     craeteJambSession();
// });

require('./app/route/auth.route')(app)
require('./app/route/jambResult.route')(app)
require('./app/route/subject.route')(app)
require('./app/route/olevel.route')(app)
require('./app/route/user.route')(app)
require('./app/route/exam.route')(app)

const PORT = process.env.PORT || 5700;

app.get('/', (req, res) => {
    res.send('welcome');
});

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
});

function createRoles(){
    Role.create({
        id: 1,
        name: 'admin'
    });
    Role.create({
        id: 2,
        name: 'student'
    });
}

function createAdmin(){
    var salt = bcrypt.genSaltSync(8);
    User.create({
        email: 'admin@admin.com',
        password: bcrypt.hashSync(config.admin,salt)
    }).then((user) => {
        Role.findOne({
            where: {
                name: 'admin'
            }
        }).then(role => {
                user.setRoles(role);
            })
        })
}
function craeteJambSession(){
    Jamb.create({
        session: '2021-2022',
        active: true
    });
}
function createSubject(){
    let subjects = [
        { id: 1, name: "MATHEMATICS" },
        { id: 2, name: "ENGLISH" },
        { id: 3, name: "PHYSICS"},
        { id: 4, name: "CHEMISTRY"},
        { id: 5, name: "BIOLOGY"},
        { id: 6, name: "AGRIC"},
        { id: 7, name: "FUTHER MATHEMATICS"},
        { id: 8, name: "GEOGRAPHY"},
        { id: 9, name: "ACCOUNT"},
        { id: 10, name: "COMMERCE"},
        { id: 11, name: "ECONOMICS"},
        { id: 12, name: "LITERATURE IN ENGLISH"},
        { id: 13, name: "HISTORY"},
        { id: 14, name: "GOVERMENT"},
        { id: 15, name: "CIVIC EDUCATION"},
        { id: 16, name: "IRK"},
        { id: 17, name: "CRK"},
        { id: 18, name: "YORUBA"},
        { id: 19, name: "IGBO"},
        { id: 20, name: "HAUSA"},
        { id: 21, name: "ANIMAL HUSBANDRY"}
    ]
    subjects.forEach(subject => {
        Subject.create({
            name: subject.name
        });
    })
    
}
