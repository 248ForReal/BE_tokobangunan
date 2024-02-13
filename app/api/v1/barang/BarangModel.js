const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/Database.js");
const Kategori = require("../kategori/KategoriModel.js");

const Barang = sequelize.define("barang", {
  barcode_barang: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nama_barang: {
    type: DataTypes.STRING,
    allowNull: true
  },
  kategori_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  harga_modal: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  harga_jual: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  persen_keuntungan: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  stok: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
},
  {
    freezeTableName: true
  });

Barang.belongsTo(Kategori, {
  foreignKey: 'kategori_id',
  as: 'kategori',
});

module.exports = Barang;
