module.exports = (sequelize, Sequelize) => {
    const Exam = sequelize.define('exam', {
        registringNo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        examName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        examYear: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return Exam;
}