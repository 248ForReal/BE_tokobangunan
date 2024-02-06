const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/Database.js');
const CartItem = require('../transaksi/CartItemModel.js');

const Transaksi = sequelize.define(
  'transaksi',
  {
    id_transaksi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    total_belanja: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    jumlah_dibayarkan: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    kembalian: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    items: {
      type: DataTypes.JSON,
      allowNull: false
    },
    nama_admin: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
);



module.exports = Transaksi;