module.exports = (sequelize, Sequelize) => {
    const Subject = sequelize.define('subject', {
        name : {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        type: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
return Subject;
}