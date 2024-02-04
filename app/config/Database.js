const Sequelize = require("sequelize");

const db = new Sequelize("tokobangunan", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;