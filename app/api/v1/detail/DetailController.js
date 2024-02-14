const Transaksi = require("./DetailModel.js");
const Barang = require("../barang/BarangModel.js")
const { Op } = require('sequelize');
const moment = require('moment');
const pesan = `Laporan untuk bulan ${moment().format('MMMM YYYY')}`;
console.log(pesan);
exports.index = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const offset = (page - 1) * limit;
        const searchKeyword = req.query.q || '';
        const searchQuery = {
            where: {
                nama_admin: {
                    [Op.like]: `%${searchKeyword}%`
                },
                id_transaksi: {
                    [Op.like]: `%${searchKeyword}%`
                }
            }
        };
        

        const totalTransaksi = await Transaksi.count(searchQuery);
        const allTransaksi = await Transaksi.findAll({
            where: searchQuery.where,
            order: [['createdAt', 'DESC']], 
            offset: offset,
            limit: limit
        });
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

exports.totalHarian = async (req, res) => {
    try {
        const today = moment().startOf('day');

        // Menghitung total jumlah dibayarkan hari ini
        const totalHarian = await Transaksi.sum('jumlah_dibayarkan', {
            where: {
                createdAt: {
                    [Op.gte]: today.toDate(), 
                    [Op.lt]: moment(today).add(1, 'day').toDate() 
                }
            }
        });

        // Menghitung total item yang terjual hari ini
        const transaksiHariIni = await Transaksi.findAll({
            where: {
                createdAt: {
                    [Op.gte]: today.toDate(), 
                    [Op.lt]: moment(today).add(1, 'day').toDate() 
                }
            }
        });

        let totalItemTerjual = 0;
        transaksiHariIni.forEach(transaksi => {
            const items = transaksi.items;
            items.forEach(item => {
                totalItemTerjual += item.quantity;
            });
        });

        return res.status(200).json({
            message: 'Total jumlah dibayarkan dan item terjual hari ini',
            totalDibayarkan: totalHarian || 0,
            totalItemTerjual: totalItemTerjual || 0
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};


exports.find = async (req, res) => {
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

exports.destroy= async (req, res) => {
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


const getTransaksiWithOptions = async (options) => {
    try {
        const page = parseInt(options.page) || 1; 
        const limit = parseInt(options.limit) || 10; 
        const offset = (page - 1) * limit;

        const result = await Transaksi.findAndCountAll({
            ...options,
            order: [['createdAt', 'DESC']], 
            offset: offset,
            limit: limit
        });

        const totalPages = Math.ceil(result.count / limit);

        return {
            totalItems: result.count,
            totalPages: totalPages,
            currentPage: page,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
            transaksi: result.rows
        };
    } catch (error) {
        throw error;
    }
};

exports.findhariini = async (req, res) => {
    try {
        const today = moment().startOf('day');

        const transaksiHariIni = await getTransaksiWithOptions({
            where: {
                createdAt: {
                    [Op.gte]: today.toDate() 
                }
            }
        });

        return res.status(200).json({
            message: 'Transaksi hari ini',
            transaksi: transaksiHariIni
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

exports.findmingguini = async (req, res) => {
    try {
        const lastWeek = moment().subtract(1, 'week').startOf('day');

        const transaksiMingguIni = await getTransaksiWithOptions({
            where: {
                createdAt: {
                    [Op.gte]: lastWeek.toDate() 
                }
            }
        });

        return res.status(200).json({
            message: 'Transaksi dalam 1 minggu terakhir',
            transaksi: transaksiMingguIni
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

exports.laporanBulanIni = async (req, res) => {
    try {
        const firstDayOfMonth = moment().startOf('month');
        
        const lastMonth = moment(firstDayOfMonth).subtract(1, 'month').startOf('month');

        const totalTransaksiBulanIni = await Transaksi.count({
            where: {
                createdAt: {
                    [Op.gte]: firstDayOfMonth.toDate(),
                    [Op.lt]: moment(firstDayOfMonth).endOf('month').toDate()
                }
            }
        });

        const totalPendapatanBulanIni = await Transaksi.sum('jumlah_dibayarkan', {
            where: {
                createdAt: {
                    [Op.gte]: firstDayOfMonth.toDate(),
                    [Op.lt]: moment(firstDayOfMonth).endOf('month').toDate()
                }
            }
        });

        const transaksiBulanIni = await Transaksi.findAll({
            where: {
                createdAt: {
                    [Op.gte]: firstDayOfMonth.toDate(),
                    [Op.lt]: moment(firstDayOfMonth).endOf('month').toDate()
                }
            },
            order: [['createdAt', 'ASC']],
        });

        const barangTerjual = {};
        transaksiBulanIni.forEach(transaksi => {
            const items = transaksi.items;
            items.forEach(item => {
                if (barangTerjual[item.nama_barang]) {
                    barangTerjual[item.nama_barang] += item.quantity;
                } else {
                    barangTerjual[item.nama_barang] = item.quantity;
                }
            });
        });

        const sortedBarangTerjual = Object.entries(barangTerjual)
            .sort((a, b) => b[1] - a[1]);

        return res.status(200).json({
            message: `Laporan untuk bulan ${moment(firstDayOfMonth).format('MMMM YYYY')}`,
            totalTransaksi: totalTransaksiBulanIni,
            totalPendapatan: totalPendapatanBulanIni,
            barangTerjual: sortedBarangTerjual,
            transaksi: transaksiBulanIni
        });
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
