const config = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorAliases: false,

        pool:{
            max: config.pool.max,
            idle: config.pool.idle,
            acquire: config.pool.acquire,
            min: config.pool.min
        }
    }
);

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize,Sequelize);
db.role = require('./role.model')(sequelize,Sequelize);
db.jamb = require('./jamb.model')(sequelize,Sequelize);
db.exam = require('./exam.model')(sequelize,Sequelize);
db.olevel = require('./olevel.model')(sequelize,Sequelize);
db.jambResult = require('./jambResult.model')(sequelize,Sequelize);
db.subject = require('./subject.model')(sequelize,Sequelize);
db.course = require('./course.model')(sequelize,Sequelize);


/*many to many relationship btw users and roles 
1. users
2. roles
3. user_roles
*/
db.role.belongsToMany(db.user, {
    through: 'user_roles',
    foreignKey: 'roleId',
    otherKey: 'userId'
});
db.user.belongsToMany(db.role, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId'
});
db.subject.hasOne(db.jambResult);
// db.exam.hasMany(db.olevel);
// db.jamb.hasMany(db.jambResult);

db.ROLES = ['student', 'admin'];

module.exports = db;
