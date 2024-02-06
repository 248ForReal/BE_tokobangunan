const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/Database.js");
const Kategori = require("../kategori/KategoriModel.js");

const Barang = sequelize.define("barang", {
  id_barang: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
},
  nama_barang: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gambar: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  kategori_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  harga: {
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
