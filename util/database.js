const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQLDATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD,{
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;