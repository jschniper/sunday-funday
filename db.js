const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "sqlite:sunday_funday.sqlite",
  {
    pool: {
      max: 5,
      min: 5,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
