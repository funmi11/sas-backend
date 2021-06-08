module.exports = (sequelize, Sequelize) => {
    const OlevelResult = sequelize.define('olevel', {  
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },     
        subjectId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },  
        examId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },   
        sitting: {
            type: Sequelize.INTEGER,
            allowNull: false
        },     
        grade: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return OlevelResult;
}