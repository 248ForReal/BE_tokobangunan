const Transaksi = require("./DetailModel.js");
const { Op } = require('sequelize');
const moment = require('moment');

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

exports.findbulanini = async (req, res) => {
    try {
        const lastMonth = moment().subtract(1, 'month').startOf('day');

        const transaksiBulanIni = await getTransaksiWithOptions({
            where: {
                createdAt: {
                    [Op.gte]: lastMonth.toDate() 
                }
            }
        });

        return res.status(200).json({
            message: 'Transaksi dalam 1 bulan terakhir',
            transaksi: transaksiBulanIni
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};
