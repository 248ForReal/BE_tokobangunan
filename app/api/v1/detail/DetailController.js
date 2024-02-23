const Transaksi = require("./DetailModel.js");
const Transaksi_barang = require("./DetailBarangModel.js");
const Barang = require("../barang/BarangModel.js");
const { Op, literal } = require('sequelize');
const moment = require('moment');
const sequelize = require('../../../config/Database.js'); // Import Sequelize instance

exports.index = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const searchKeyword = req.query.q || '';
        const searchQuery = {
            where: {
                [Op.or]: [
                    { nama_admin: { [Op.like]: `%${searchKeyword}%` } },
                    { id_transaksi: { [Op.like]: `%${searchKeyword}%` } }
                ]
            },
            order: [['createdAt', 'DESC']],
            offset: offset,
            limit: limit
        };

        const totalTransaksi = await Transaksi.count(searchQuery);
        const allTransaksi = await Transaksi.findAll(searchQuery);
        const totalPages = Math.ceil(totalTransaksi / limit);

        return res.status(200).json({
            message: 'Berhasil mengambil semua transaksi',
            transaksi: allTransaksi,
            pagination: {
                totalItems: totalTransaksi,
                totalPages: totalPages,
                currentPage: page,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

exports.find_penjualan = async (req, res) => {
    try {

        const { id } = req.params;


        const transaksi = await Transaksi.findByPk(id);


        if (!transaksi) {
            return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
        }

        return res.status(200).json({
            message: 'Berhasil mendapatkan detail transaksi',
            transaksi: transaksi
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

exports.PenjualanHarian = async (req, res) => {
    try {
        const today = moment().startOf('day');

        // Menghitung total jumlah belanja hari ini
        const totalHarian = await Transaksi.sum('total_belanja', {
            where: {
                createdAt: {
                    [Op.gte]: today.toDate(),
                    [Op.lt]: moment(today).add(1, 'day').toDate()
                }
            }
        }) || 0;

        // Mengambil semua transaksi hari ini dengan pengurutan descending
        const transaksiHariIni = await Transaksi.findAll({
            where: {
                createdAt: {
                    [Op.gte]: today.toDate(),
                    [Op.lt]: moment(today).add(1, 'day').toDate()
                }
            },
            order: [['createdAt', 'DESC']], // Pengurutan descending berdasarkan createdAt
        });

        let totalModalKeseluruhan = 0;
        let totalItemTerjual = 0;

        // Menghitung jumlah_modal_keseluruhan dan total item terjual dari setiap transaksi
        transaksiHariIni.forEach(transaksi => {
            transaksi.items.forEach(item => {
                if (item.jumlah_modal_keseluruhan) {
                    totalModalKeseluruhan += item.jumlah_modal_keseluruhan;
                }
                totalItemTerjual += item.quantity || 0;
            });
        });

        // Menghitung total keuntungan hari ini
        const totalKeuntunganHarian = totalHarian - totalModalKeseluruhan;

        // Menghitung persentase keuntungan
        const persentaseKeuntungan = (totalKeuntunganHarian / totalModalKeseluruhan);

        return res.status(200).json({
            message: 'Data transaksi hari ini',
            totalTransaksi: transaksiHariIni.length, 
            totalDibayarkan: totalHarian,
            totalItemTerjual: totalItemTerjual,
            totalModal: totalModalKeseluruhan,
            keuntunganHarian: totalKeuntunganHarian,
            persentaseKeuntungan: persentaseKeuntungan.toFixed(2), // Mengubah ke desimal dengan dua angka di belakang koma
            transaksiHariIni: transaksiHariIni // Menambahkan daftar transaksi hari ini
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

exports.PenjualanMingguan = async (req, res) => {
    try {
        const startOfWeek = moment().startOf('week'); // Mengambil awal minggu ini
        const endOfWeek = moment().endOf('week'); // Mengambil akhir minggu ini

        // Menghitung total jumlah belanja minggu ini
        const totalMingguan = await Transaksi.sum('total_belanja', {
            where: {
                createdAt: {
                    [Op.gte]: startOfWeek.toDate(),
                    [Op.lte]: endOfWeek.toDate()
                }
            }
        }) || 0;

        // Mengambil semua transaksi minggu ini dengan pengurutan descending
        const transaksiMingguan = await Transaksi.findAll({
            where: {
                createdAt: {
                    [Op.gte]: startOfWeek.toDate(),
                    [Op.lte]: endOfWeek.toDate()
                }
            },
            order: [['createdAt', 'DESC']], // Pengurutan descending berdasarkan createdAt
        });

        let totalModalKeseluruhan = 0;
        let totalItemTerjual = 0;

        // Menghitung jumlah_modal_keseluruhan dan total item terjual dari setiap transaksi
        transaksiMingguan.forEach(transaksi => {
            transaksi.items.forEach(item => {
                if (item.jumlah_modal_keseluruhan) {
                    totalModalKeseluruhan += item.jumlah_modal_keseluruhan;
                }
                totalItemTerjual += item.quantity || 0;
            });
        });

        // Menghitung total keuntungan minggu ini
        const totalKeuntunganMingguan = totalMingguan - totalModalKeseluruhan;

        // Menghitung persentase keuntungan
        const persentaseKeuntungan = (totalKeuntunganMingguan / totalModalKeseluruhan);

        return res.status(200).json({
            message: 'Data transaksi minggu ini',
            totalTransaksi: transaksiMingguan.length, 
            totalDibayarkan: totalMingguan,
            totalItemTerjual: totalItemTerjual,
            totalModal: totalModalKeseluruhan,
            keuntunganMingguan: totalKeuntunganMingguan,
            persentaseKeuntungan: persentaseKeuntungan.toFixed(2), // Mengubah ke desimal dengan dua angka di belakang koma
            transaksiMingguan: transaksiMingguan // Menambahkan daftar transaksi minggu ini
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};


exports.PenjualanBulanan = async (req, res) => {
    try {
        const startOfMonth = moment().startOf('month'); // Mengambil awal bulan ini
        const endOfMonth = moment().endOf('month'); // Mengambil akhir bulan ini

        // Menghitung total jumlah belanja bulan ini
        const totalBulanan = await Transaksi.sum('total_belanja', {
            where: {
                createdAt: {
                    [Op.gte]: startOfMonth.toDate(),
                    [Op.lte]: endOfMonth.toDate()
                }
            }
        }) || 0;

        // Mengambil semua transaksi bulan ini dengan pengurutan descending
        const transaksiBulanan = await Transaksi.findAll({
            where: {
                createdAt: {
                    [Op.gte]: startOfMonth.toDate(),
                    [Op.lte]: endOfMonth.toDate()
                }
            },
            order: [['createdAt', 'DESC']], // Pengurutan descending berdasarkan createdAt
        });

        let totalModalKeseluruhan = 0;
        let totalItemTerjual = 0;

        // Menghitung jumlah_modal_keseluruhan dan total item terjual dari setiap transaksi
        transaksiBulanan.forEach(transaksi => {
            transaksi.items.forEach(item => {
                if (item.jumlah_modal_keseluruhan) {
                    totalModalKeseluruhan += item.jumlah_modal_keseluruhan;
                }
                totalItemTerjual += item.quantity || 0;
            });
        });

        // Menghitung total keuntungan bulan ini
        const totalKeuntunganBulanan = totalBulanan - totalModalKeseluruhan;

        // Menghitung persentase keuntungan
        const persentaseKeuntungan = (totalKeuntunganBulanan / totalModalKeseluruhan);

        return res.status(200).json({
            message: 'Data transaksi bulan ini',
            totalTransaksi: transaksiBulanan.length, 
            totalDibayarkan: totalBulanan,
            totalItemTerjual: totalItemTerjual,
            totalModal: totalModalKeseluruhan,
            keuntunganBulanan: totalKeuntunganBulanan,
            persentaseKeuntungan: persentaseKeuntungan.toFixed(2), // Mengubah ke desimal dengan dua angka di belakang koma
            transaksiBulanan: transaksiBulanan // Menambahkan daftar transaksi bulan ini
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

exports.LaporanPenjualan = async (req, res) => {
    try {
        // Mendapatkan rentang tanggal dari input pengguna
        const { startDate, endDate } = req.body;

        // Validasi tanggal
        if (!moment(startDate, 'YYYY-MM-DD', true).isValid() || !moment(endDate, 'YYYY-MM-DD', true).isValid()) {
            return res.status(400).json({ message: 'Format tanggal tidak valid. Gunakan format YYYY-MM-DD.' });
        }

        // Membuat objek tanggal mulai dan selesai dari string input pengguna
        const firstDay = moment(startDate).startOf('day');
        const lastDay = moment(endDate).endOf('day');

        // Menampilkan data transaksi dalam rentang tanggal yang diberikan
        const transaksiRentangTanggal = await Transaksi.findAll({
            where: {
                createdAt: {
                    [Op.between]: [firstDay.toDate(), lastDay.toDate()] // Menggunakan operator between untuk rentang tanggal
                }
            },
            order: [['createdAt', 'ASC']], // Mengurutkan berdasarkan tanggal transaksi secara ascending
        });

        // Periksa ketersediaan transaksi dalam rentang tanggal
        if (transaksiRentangTanggal.length === 0) {
            return res.status(404).json({ message: 'Tidak ada transaksi dalam rentang tanggal yang diberikan.' });
        }

        // Menyederhanakan data transaksi untuk frontend
        const simplifiedTransaksi = transaksiRentangTanggal.map(transaksi => {
            return {
                id_transaksi: transaksi.id_transaksi,
                total_belanja: transaksi.total_belanja,
                jumlah_dibayarkan: transaksi.jumlah_dibayarkan,
                kembalian: transaksi.kembalian,
                items: transaksi.items.map(item => ({
                    nama_barang: item.nama_barang,
                    quantity: item.quantity,
                    total_harga: item.total_harga
                })),
                nama_admin: transaksi.nama_admin
            };
        });

        return res.status(200).json({
            message: `Laporan untuk rentang tanggal ${startDate} sampai ${endDate}`,
            transaksi: simplifiedTransaksi
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }

};

exports.pengembalian = async (req, res) => {
    try {
        const { id } = req.params; 
        const { total_belanja, jumlah_dibayarkan, kembalian, items } = req.body; 

        const transaction = await Transaksi.findByPk(id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
        }

        
        const previousItems = [...transaction.items];

       
        transaction.total_belanja = total_belanja;
        transaction.jumlah_dibayarkan = jumlah_dibayarkan;
        transaction.kembalian = kembalian;
        transaction.items = items;


       
        async function updateBarangStock(items, previousItems) {
            try {
               
                const barangStockChanges = {};

              
                for (const item of items) {
                    const { id: itemId, quantity: newQuantity } = item;

                    const barang = await Barang.findByPk(itemId);

                    if (!barang) {
                        console.error(`Barang dengan ID ${itemId} tidak ditemukan.`);
                        continue; 
                    }

                    const oldItem = previousItems.find(item => item.id === itemId);

                    
                    const quantityDifference = newQuantity - (oldItem ? oldItem.quantity : 0);

                    barangStockChanges[itemId] = quantityDifference;
                    barang.stok -= quantityDifference;

                    await barang.save();
                }

                console.log('Perubahan stok barang berhasil disimpan.');
            } catch (error) {
                console.error('Terjadi kesalahan dalam pembaruan stok barang:', error);
            }
        }

        async function returnMissingItemsToStock(items, previousItems) {
            try {
    
                const missingItemQuantities = {};
                for (const oldItem of previousItems) {
                    const { id: oldItemId, quantity: oldQuantity } = oldItem;

                   
                    if (!items.some(item => item.id === oldItemId)) {
                        missingItemQuantities[oldItemId] = oldQuantity;
                    }
                }

                for (const missingItemId in missingItemQuantities) {
                    if (missingItemQuantities.hasOwnProperty(missingItemId)) {
                        const quantityToReturn = missingItemQuantities[missingItemId];
                        const barang = await Barang.findByPk(missingItemId);

                        if (barang) {
                            barang.stok += quantityToReturn;

                            await barang.save();
                        } else {
                            console.error(`Barang dengan ID ${missingItemId} tidak ditemukan.`);
                        }
                    }
                }

                console.log('Quantity barang yang tidak ada dalam transaksi baru berhasil dikembalikan ke stok.');
            } catch (error) {
                console.error('Terjadi kesalahan dalam pengembalian quantity barang ke stok:', error);
            }
        }

        await updateBarangStock(items, previousItems);
        await returnMissingItemsToStock(items, previousItems);

  
        let jumlah_modal_keseluruhan = 0;
        items.forEach(item => {
            item.jumlah_modal = item.harga_modal * item.quantity;
            jumlah_modal_keseluruhan += item.jumlah_modal;
        });

       
        items.unshift({ jumlah_modal_keseluruhan });


       
        await transaction.save();

        return res.status(200).json({ message: 'Transaksi berhasil diperbarui', transaction });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

exports.index_pembelian = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const searchKeyword = req.query.q || '';
        const searchQuery = {
            where: {
                [Op.or]: [
                    { nama_admin: { [Op.like]: `%${searchKeyword}%` } },
                    // Anda harus menyesuaikan bagian pencarian berdasarkan kebutuhan aplikasi Anda
                    // Karena contoh tidak menyebutkan kolom 'id_transaksi', saya tidak akan mengikutsertakannya
                ]
            },
            order: [['createdAt', 'DESC']],
            offset: offset,
            limit: limit
        };

        const totalTransaksi = await Transaksi_barang.count(searchQuery);
        const allTransaksi = await Transaksi_barang.findAll(searchQuery);
        const totalPages = Math.ceil(totalTransaksi / limit);

        return res.status(200).json({
            message: 'Berhasil mengambil semua transaksi',
            transaksi: allTransaksi,
            pagination: {
                totalItems: totalTransaksi,
                totalPages: totalPages,
                currentPage: page,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

exports.find_pembelian= async (req, res) => {
    try {
        const transaksiId = req.params.id;

        // Temukan transaksi berdasarkan ID
        const transaksi = await Transaksi_barang.findByPk(transaksiId);

        // Jika transaksi ditemukan, kirim respons JSON
        if (transaksi) {
            return res.status(200).json({
                message: 'Berhasil menemukan transaksi',
                transaksi: transaksi
            });
        } else {
            // Jika transaksi tidak ditemukan, kirim respons JSON dengan status 404 (Not Found)
            return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
        }
    } catch (error) {
        // Tangani kesalahan dengan mengirim respons JSON dengan status 500 (Internal Server Error)
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

exports.PembelianHari = async (req, res) => {
    try {
        // Mendapatkan tanggal awal dan akhir hari ini menggunakan Moment.js
        const startOfDay = moment().startOf('day');
        const endOfDay = moment().endOf('day');

        console.log("Rentang waktu yang digunakan:", startOfDay.format(), "sampai", endOfDay.format());

        // Query untuk mencari total belanja dalam rentang waktu hari ini
        const totalHarian = await Transaksi_barang.sum('total_belanja', {
            where: {
                createdAt: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            }
        });

        // Query untuk mengambil data transaksi dalam rentang waktu hari ini, diurutkan dari yang terbaru
        const transaksiHarian = await Transaksi_barang.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            },
            order: [['createdAt', 'DESC']]
        });

        console.log("Total pembelian harian:", totalHarian);
        console.log("Jumlah transaksi harian:", transaksiHarian.length);

        return res.status(200).json({
            message: 'Data pembelian hari ini',
            totalHarian: totalHarian || 0,
            jumlahTransaksi: transaksiHarian.length,
            transaksiHarian: transaksiHarian
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};



exports.PembelianMingguan = async (req, res) => {
    try {
        const startOfWeek = moment().startOf('week'); // Mengambil awal minggu ini
        const endOfWeek = moment().endOf('week'); // Mengambil akhir minggu ini

        // Menghitung total belanja minggu ini
        const totalMingguan = await Transaksi_barang.sum('total_belanja', {
            where: {
                createdAt: {
                    [Op.between]: [startOfWeek.toDate(), endOfWeek.toDate()]
                }
            }
        }) || 0;

        // Menghitung jumlah transaksi dalam rentang waktu mingguan
        const jumlahTransaksi = await Transaksi_barang.count({
            where: {
                createdAt: {
                    [Op.between]: [startOfWeek.toDate(), endOfWeek.toDate()]
                }
            }
        });

        // Mengambil semua transaksi minggu ini dengan pengurutan descending berdasarkan tanggal pembuatan
        const transaksiMingguan = await Transaksi_barang.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startOfWeek.toDate(), endOfWeek.toDate()]
                }
            },
            order: [['createdAt', 'DESC']], // Pengurutan descending berdasarkan createdAt
        });

        return res.status(200).json({
            message: 'Data pembelian minggu ini',
            totalPembelian: totalMingguan,
            jumlahTransaksi: jumlahTransaksi,
            transaksiMingguan: transaksiMingguan
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};


exports.PembelianBulan= async (req, res) => {
    try {
        // Mendapatkan tanggal awal dan akhir bulan ini menggunakan Moment.js
        const startOfMonth = moment().startOf('month');
        const endOfMonth = moment().endOf('month');

        console.log("Rentang waktu yang digunakan:", startOfMonth.format(), "sampai", endOfMonth.format());

        // Query untuk mencari total belanja dalam rentang waktu bulan ini
        const totalBulanan = await Transaksi_barang.sum('total_belanja', {
            where: {
                createdAt: {
                    [Op.between]: [startOfMonth, endOfMonth]
                }
            }
        });

        // Query untuk mengambil data transaksi dalam rentang waktu bulan ini, diurutkan dari yang terbaru
        const transaksiBulanan = await Transaksi_barang.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startOfMonth, endOfMonth]
                }
            },
            order: [['createdAt', 'DESC']]
        });

        console.log("Total pembelian bulanan:", totalBulanan);
        console.log("Jumlah transaksi bulanan:", transaksiBulanan.length);

        return res.status(200).json({
            message: 'Data pembelian bulan ini',
            totalBulanan: totalBulanan || 0,
            jumlahTransaksi: transaksiBulanan.length,
            transaksiBulanan: transaksiBulanan
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

exports.LaporanPembelian = async (req, res) => {
    try {
        // Mendapatkan rentang tanggal dari input pengguna
        const { startDate, endDate } = req.body;

        // Validasi tanggal
        if (!moment(startDate, 'YYYY-MM-DD', true).isValid() || !moment(endDate, 'YYYY-MM-DD', true).isValid()) {
            return res.status(400).json({ message: 'Format tanggal tidak valid. Gunakan format YYYY-MM-DD.' });
        }

        // Membuat objek tanggal mulai dan selesai dari string input pengguna
        const firstDay = moment(startDate).startOf('day');
        const lastDay = moment(endDate).endOf('day');

        // Menampilkan data pembelian dalam rentang tanggal yang diberikan
        const pembelianRentangTanggal = await Transaksi_barang.findAll({
            where: {
                createdAt: {
                    [Op.between]: [firstDay.toDate(), lastDay.toDate()] // Menggunakan operator between untuk rentang tanggal
                }
            },
            order: [['createdAt', 'ASC']], // Mengurutkan berdasarkan tanggal pembelian secara ascending
        });

        // Periksa ketersediaan pembelian dalam rentang tanggal
        if (pembelianRentangTanggal.length === 0) {
            return res.status(404).json({ message: 'Tidak ada pembelian dalam rentang tanggal yang diberikan.' });
        }

        // Menyederhanakan data pembelian untuk frontend
        const simplifiedPembelian = pembelianRentangTanggal.map(pembelian => {
            return {
                id: pembelian.id,
                total_belanja: pembelian.total_belanja,
                kembalian: pembelian.kembalian,
                items: pembelian.items.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    harga_modal: item.harga_modal,
                    nama_barang: item.nama_barang,
                    total_harga: item.total_harga
                })),
                nama_admin: pembelian.nama_admin,
                createdAt: pembelian.createdAt,
                updatedAt: pembelian.updatedAt
            };
        });

        return res.status(200).json({
            message: `Laporan untuk rentang tanggal ${startDate} sampai ${endDate}`,
            pembelian: simplifiedPembelian
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};



exports.destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const transaksi = await Transaksi.findByPk(id);


        if (!transaksi) {
            return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
        }


        await transaksi.destroy();
        return res.status(200).json({ message: 'Transaksi berhasil dihapus' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};







exports.refund = async (req, res) => {
    try {
        const { id_transaksi } = req.body;

        const transaksi = await Transaksi.findOne({ where: { id_transaksi } });

        if (!transaksi) {
            return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
        }

        const items = transaksi.items;

        for (const item of items) {
            const barang = await Barang.findOne({ where: { nama_barang: item.nama_barang } });
            if (barang) {
                barang.stok += item.quantity;
                await barang.save();
            }
        }


        await transaksi.destroy();

        return res.status(200).json({ message: 'Transaksi berhasil dikembalikan dan stok barang diperbarui' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};
