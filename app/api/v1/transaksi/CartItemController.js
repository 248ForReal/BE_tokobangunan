const CartItem = require("./CartItemModel.js");
const Admin = require("../adminn/AdminModel.js");
const Barang = require("../barang/BarangModel.js")
const Transaction = require('../detail/DetailModel.js');
const  Sequelize= require('sequelize');
const sequelize = require('../../../config/Database.js');


const generateUniqueTransactionId = async () => {
    try {
        const currentTime = new Date();
        const currentDate = currentTime.toISOString().slice(0, 10);
        
        // Ambil data transaksi terakhir dari database
        const lastTransaction = await Transaction.findOne({
            order: [['createdAt', 'DESC']] // Mengurutkan transaksi berdasarkan tanggal pembuatan secara descending
        });

        let lastTransactionDate = null;
        let transactionCount = 0;

        // Jika ada transaksi terakhir, ambil tanggal pembuatan transaksi terakhir
        if (lastTransaction) {
            lastTransactionDate = lastTransaction.createdAt.toISOString().slice(0, 10);
            // Jika tanggal transaksi terakhir sama dengan tanggal saat ini, gunakan nomor urut dari transaksi terakhir
            if (lastTransactionDate === currentDate) {
                transactionCount = parseInt(lastTransaction.id_transaksi.slice(-3)); // Ambil nomor urut dari ID transaksi terakhir
            }
        }

        // Mencari nomor urut terakhir untuk tanggal yang sama
        if (lastTransactionDate === currentDate) {
            transactionCount++;
        } else {
            // Jika tanggal terakhir tidak sama dengan tanggal saat ini, reset nomor urut
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






exports.index = async (req, res) => {
    try {
        const cartItems = await CartItem.findAll({
            include: [
                {
                    model: Barang,
                    as: 'barang',
                },
            ],
        });

        const totalHargaKeseluruhan = await CartItem.sum('total_harga');

        res.status(200).json({ cartItems, totalHargaKeseluruhan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports.find = async (req, res) => {
    try {
        const { id_cart_item } = req.params;

        let cartItems;
        if (id_cart_item) {
            cartItems = await CartItem.findOne({
                where: { id_cart_item },
                include: [
                    {
                        model: Barang,
                        as: 'barang',
                    },
                ],
            });
        } else {
            cartItems = await CartItem.findAll({
                include: [
                    {
                        model: Barang,
                        as: 'barang',
                    },
                ],
            });
        }

        res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports.create = async (req, res) => {
    try {
        const admin_uuid = req.session.userId;
        if (!admin_uuid) {
            return res.status(403).json({
                msg: "Unauthorized access. Missing admin_uuid in session."
            });
        }

        const { barang_id, quantity } = req.body;
        const barang = await Barang.findByPk(barang_id);

        if (!barang) {
            return res.status(404).json({
                msg: "Barang not found."
            });
        }
        const existingCartItem = await CartItem.findOne({
            where: { id_barang: barang_id },
            include: [{ model: Barang, as: 'barang' }]
        });

        const totalQuantityInCart = existingCartItem ? existingCartItem.quantity : 0;

        if (quantity + totalQuantityInCart > barang.stok) {
            return res.status(400).json({
                msg: "Total quantity exceeds available stock."
            });
        }
        let cartItem = existingCartItem;

        if (cartItem) {
            cartItem.quantity += quantity;
            cartItem.total_harga = cartItem.quantity * cartItem.barang.harga;
            await cartItem.save();
        } else {
            const admin = await Admin.findOne({
                where: { uuid: admin_uuid }
            });

            if (!admin) {
                return res.status(404).json({
                    msg: "Admin not found."
                });
            }
            cartItem = await CartItem.create({
                id_barang: barang_id,
                quantity: quantity,
                total_harga: quantity * barang.harga,
                harga: barang.harga,
                nama_admin: admin.nama_admin
            });
        }

        res.status(201).json({
            msg: "Successfully created!",
            data: cartItem
        });
    } catch (error) {
        console.error("Error during creation:", error);
        res.status(400).json({
            msg: error.message
        });
    }
};



exports.updateCartItemQuantity = async (req, res) => {
    try {
        const { id_cart_item } = req.params;
        const { quantity } = req.body;

        const cartItem = await CartItem.findByPk(id_cart_item);

        if (!cartItem) {
            return res.status(404).json({ message: 'Item keranjang tidak ditemukan' });
        }

        const barang = await Barang.findByPk(cartItem.id_barang);
        if (!barang || quantity > barang.stok) {
            return res.status(400).json({ message: 'Quantity melebihi stok barang yang tersedia' });
        }
        cartItem.quantity = quantity;
        const total_harga_baru = quantity * barang.harga;
        cartItem.total_harga = total_harga_baru;


        await cartItem.save();

        return res.status(200).json({ message: 'Quantity berhasil diperbarui', cartItem });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};


exports.addOneQuantity = async (req, res) => {
    try {
        const { id_cart_item } = req.params;


        const cartItem = await CartItem.findByPk(id_cart_item);

        if (!cartItem) {
            return res.status(404).json({ message: 'Item keranjang tidak ditemukan' });
        }

        const barang = await Barang.findByPk(cartItem.id_barang);


        if (cartItem.quantity + 1 > barang.stok) {
            return res.status(400).json({ message: 'Jumlah total quantity melebihi stok barang yang tersedia' });
        }

        cartItem.quantity += 1;


        const total_harga_baru = cartItem.quantity * barang.harga;
        cartItem.total_harga = total_harga_baru;


        await cartItem.save();
        return res.status(200).json({ message: 'Quantity berhasil ditambahkan', cartItem });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};


exports.subtractOneQuantity = async (req, res) => {
    try {
        const { id_cart_item } = req.params;

        const cartItem = await CartItem.findByPk(id_cart_item);


        if (!cartItem) {
            return res.status(404).json({ message: 'Item keranjang tidak ditemukan' });
        }


        if (cartItem.quantity < 1) {
            return res.status(400).json({ message: 'Quantity sudah mencapai minimum' });
        }


        cartItem.quantity -= 1;

        const barang = await Barang.findByPk(cartItem.id_barang);


        const total_harga_baru = cartItem.quantity * barang.harga;
        cartItem.total_harga = total_harga_baru;

        await cartItem.save();
        return res.status(200).json({ message: 'Quantity berhasil dikurangi', cartItem });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};


exports.transaction = async (req, res) => {
    try {
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

      
        const totalBelanja = await CartItem.findAll({
            attributes: [
                'id_barang',
                [Sequelize.fn('sum', Sequelize.col('quantity')), 'quantity'],
                [Sequelize.fn('sum', Sequelize.col('total_harga')), 'total_harga']
            ],
            group: ['id_barang'],
            include: [{
                model: Barang,
                as: 'barang',
                attributes: ['nama_barang', 'stok'] 
            }]
        });

        const items = totalBelanja.map(item => ({
            nama_barang: item.barang.nama_barang,
            quantity: item.quantity,
            total_harga: item.total_harga
        }));

    
        let total = 0;
        totalBelanja.forEach(item => {
            total += item.total_harga;
        });

      
        const { jumlah_dibayarkan } = req.body;

        
        const kembalian = jumlah_dibayarkan - total;
        const uniqueId = await generateUniqueTransactionId();

        const transaction = await Transaction.create({
            id_transaksi: uniqueId,
            total_belanja: total,
            jumlah_dibayarkan: jumlah_dibayarkan,
            kembalian: kembalian,
            items: items, 
            nama_admin: admin.nama_admin 
        });
        

        await Promise.all(totalBelanja.map(async item => {
            const { id_barang, quantity } = item.dataValues;
            const barang = await Barang.findByPk(id_barang);
            if (barang) {
                await barang.update({ stok: sequelize.literal(`stok - ${quantity}`) });
            }
        }));

        await CartItem.destroy({ where: {} });
        await sequelize.query('ALTER TABLE cartItems AUTO_INCREMENT = 1');
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



exports.update = async (req, res) => {
    const cartItemId = req.params.id;
    const { id_barang, quantity, kasir_uuid } = req.body;

    try {
        const cartItem = await CartItem.findOne({
            where: {
                id_cart_item: cartItemId
            }
        });

        if (!cartItem) {
            return res.status(404).json({
                msg: "CartItem does not exist"
            });
        }

        await cartItem.update({
            id_barang: id_barang,
            quantity: quantity,
            kasir_uuid: kasir_uuid,

        });

        res.status(200).json({
            msg: "CartItem updated!",
            data: cartItem
        });
    } catch (error) {
        res.status(400).json({
            msg: error.message
        });
    }
}

exports.destroy = async (req, res) => {
    const cartItemId = req.params.id;

    try {
        const cartItem = await CartItem.findOne({
            where: {
                id_cart_item: cartItemId
            }
        });

        if (!cartItem) {
            return res.status(404).json({
                msg: "CartItem does not exist"
            });
        }

        await CartItem.destroy({
            where: {
                id_cart_item: cartItemId
            }
        });

        res.status(200).json({
            msg: "CartItem deleted!",
            data: cartItem
        });
    } catch (error) {
        res.status(400).json({
            msg: error.message
        });
    }
}