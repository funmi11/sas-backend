module.exports = (sequelize, Sequelize) => {
   const Jamb = sequelize.define('jamb', {
        session: {
           type : Sequelize.STRING,
           allowNull: false
        },
        description: {
           type: Sequelize.STRING,
           allowNull: true
        },
        active: {
           type: Sequelize.BOOLEAN,
        }
    });
return Jamb;
}