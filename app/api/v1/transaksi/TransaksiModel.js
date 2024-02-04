const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../../config/Database.js");

const Transaksi = db.define("transaksi", {
    id_transaksi: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    tanggal: {
        type: DataTypes.DATE,
        allowNull: true
    },
    waktu: {
        type: DataTypes.TIME,
        allowNull: true
    },
    total_harga: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    kasir_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    pelanggan_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
},
{
    freezeTableNames: true,
});

module.exports = Transaksi;