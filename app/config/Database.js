const Sequelize = require("sequelize");
const moment = require("moment-timezone");


moment.tz.setDefault("Asia/Jakarta");

const db = new Sequelize("sumber12_tokobangunan", "sumber12_sumber12", "xkTBX1Cxa=6t", {
  host: "localhost",
  dialect: "mysql",
  timezone: "+07:00", 
});

module.exports = db;