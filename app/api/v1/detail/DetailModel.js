const {  DataTypes } = require("sequelize");
const db = require("../../../config/Database.js");

const Detail = db.define("detail", {
    id_detail_transaksi: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    transaksi_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    kategori_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    barang_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    jumlah: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    harga: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
},
{
    freezeTableNames: true,
});

module.exports = Detail;