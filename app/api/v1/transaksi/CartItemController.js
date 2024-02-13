const Admin = require("../adminn/AdminModel.js");
const Barang = require("../barang/BarangModel.js")
const Transaction = require('../detail/DetailModel.js');
const  Sequelize= require('sequelize');
const sequelize = require('../../../config/Database.js');


const generateUniqueTransactionId = async () => {
    try {
        const currentTime = new Date();
        const currentDate = currentTime.toISOString().slice(0, 10);
        
        const lastTransaction = await Transaction.findOne({
            order: [['createdAt', 'DESC']] 
        });

        let lastTransactionDate = null;
        let transactionCount = 0;

        if (lastTransaction) {
            lastTransactionDate = lastTransaction.createdAt.toISOString().slice(0, 10);
            if (lastTransactionDate === currentDate) {
                transactionCount = parseInt(lastTransaction.id_transaksi.slice(-3)); 
            }
        }
        if (lastTransactionDate === currentDate) {
            transactionCount++;
        } else {
            transactionCount = 1;
        }

        const paddedTransactionCount = transactionCount.toString().padStart(3, '0');

        const uniqueId = `T${currentDate}${paddedTransactionCount}`;

        return uniqueId;
    } catch (error) {
        console.error("Error generating unique transaction ID:", error);
        throw new Error("Error generating unique transaction ID");
    }
};




exports.transaction = async (req, res) => {
    try {
        const { total_belanja, jumlah_dibayarkan, kembalian, items } = req.body;
        const admin_uuid = req.session.userId;

        if (!admin_uuid) {
            return res.status(403).json({
                msg: "Unauthorized access. Missing admin_uuid in session."
            });
        }

        const admin = await Admin.findOne({
            where: { uuid: admin_uuid }
        });

        if (!admin) {
            return res.status(404).json({
                msg: "Admin not found."
            });
        }
        const uniqueId = await generateUniqueTransactionId();

        const transaction = await Transaction.create({
            id_transaksi: uniqueId,
            total_belanja: total_belanja,
            jumlah_dibayarkan: jumlah_dibayarkan,
            kembalian: kembalian,
            items: items,
            nama_admin: admin.nama_admin
        });

        await Promise.all(items.map(async item => {
            const { barcode_barang, quantity } = item;
            const barang = await Barang.findByPk(barcode_barang);
            if (barang) {
                await barang.update({ stok: barang.stok - quantity });
            }
        }));

        return res.status(200).json({
            message: 'Transaksi berhasil',
            transaction: transaction,
            kembalian: kembalian
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};


