    const { Sequelize, DataTypes } = require("sequelize");
    const db = require("../../../config/Database.js");

    const Kategori = db.define("kategori", {
        kategori: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        freezeTableNames: true,
    });

    module.exports = Kategori;
