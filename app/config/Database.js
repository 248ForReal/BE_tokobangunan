const Sequelize = require("sequelize");
const moment = require("moment-timezone");


moment.tz.setDefault("Asia/Jakarta");

const db = new Sequelize("tokobangunan", "root", "", {
  host: "localhost",
  dialect: "mysql",
  timezone: "+07:00", 
});

module.exports = db;