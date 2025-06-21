const { Sequelize } = require('sequelize');
const config = require('./db.config');

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    port: config.PORT,
    dialect: config.dialect,
    pool: config.pool,
    logging: false
  }
);

module.exports = sequelize;