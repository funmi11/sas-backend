module.exports = {
    HOST : 'localhost',
    USER: 'root',
    PASSWORD: '',
    DB: 'sas',
    dialect: 'mysql',
    pool: {
        max: 1000,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

// module.exports = {
//   HOST: "localhost",
//   USER: "onigege",
//   PASSWORD: "gege@CODEtech2019",
//   DB: "diamondFMReport",
//   dialect: "mysql",
//   pool: {
//     max: 1000,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };