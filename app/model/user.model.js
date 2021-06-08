module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        jambRegistrationNo: {
            type: Sequelize.STRING,
            allowNull : true,
        },
        jambId: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull : true,
        },
        middleName: {
            type : Sequelize.STRING,
            allowNull: true
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        userName:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false
        },
        phoneNumber:{
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
        },
        image:{
            type: Sequelize.STRING,
            allowNull: true
        },
        nationality:{
            type: Sequelize.STRING,
            allowNull: true
        },
        state:{
            type: Sequelize.STRING,
            allowNull: true
        },
        dob:{
            type: Sequelize.DATE,
            allowNull: true
        },
        gender:{
            type: Sequelize.STRING,
            allowNull: true
        },
        lga:{
            type: Sequelize.STRING,
            allowNull: true
        },
        disability:{
            type: Sequelize.STRING,
            allowNull: true
        },
        firstCourse: {
            type: Sequelize.STRING,
            allowNull: true
        },
        secondCourse: {
            type: Sequelize.STRING,
            allowNull: true
        }
    },
    {
        scopes: {
            withoutPassword: {
                attributes: {exclude: ['password']}
            }
        }
    });
return User;
}
