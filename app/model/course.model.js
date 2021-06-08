module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define('course', {
        name : {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        faculty: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
return Course;
}