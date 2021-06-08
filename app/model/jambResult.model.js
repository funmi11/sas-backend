module.exports = (sequelize, Sequelize) => {
    const JambResult = sequelize.define('jamb_result', {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },     
        subjectId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }, 
        jambId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
         score: {
            type: Sequelize.INTEGER,
            allowNull: false
         }
     });
 return JambResult;
 }