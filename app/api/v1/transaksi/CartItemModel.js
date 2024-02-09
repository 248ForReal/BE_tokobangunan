const { DataTypes } = require("sequelize");
const db = require("../../../config/Database.js");
const Barang = require("../barang/BarangModel.js");

const CartItem = db.define("cartItem", {
    id_cart_item: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    total_harga: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    nama_admin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    id_barang: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Barang,
            key: 'id_barang'
        }
    }
},
{
    freezeTableNames: true,
});


CartItem.belongsTo(Barang, {
    foreignKey: 'id_barang',
    as: 'barang', 
    targetKey: 'id_barang'
});

module.exports = CartItem;
