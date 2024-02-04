const Transaksi = require("./TransaksiModel.js");

exports.index = async (req, res) => {
    try {
        const response = await Transaksi.findAll({})

        res.status(200).json({
            data: response
        })
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}

exports.find = async (req, res) => {
    try {
        const response = await Transaksi.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            data: response
        })
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}

exports.create = async (req, res) => {
    const { id_transaksi, tanggal, waktu, total_harga, kasir_id, pelanggan_id } = req.body

    try {
        await Transaksi.create({
            id_transaksi: id_transaksi,
            tanggal: tanggal,
            waktu: waktu,
            total_harga: total_harga,
            kasir_id: kasir_id,
            pelanggan_id: pelanggan_id
        })
        res.status(201).json({
            msg: "Successfully created!"
        })
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
}

exports.update = async (req, res) => {
    const transaksi = await Transaksi.findOne({
        where: {
            id: req.params.id
        }
    })

    if (!transaksi) return res.status(404).json({
        msg: "Transaksi does not exist"
    })

    const { id_transaksi, tanggal, waktu, total_harga, kasir_id, pelanggan_id } = req.body

    try {
        await Transaksi.update({
            id_transaksi: id_transaksi,
            tanggal: tanggal,
            waktu: waktu,
            total_harga: total_harga,
            kasir_id: kasir_id,
            pelanggan_id: pelanggan_id
        }, {
            where: {
                id: transaksi.id
            }
        })
        res.status(200).json({
            msg: "Transaksi updated!"
        })
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
}

exports.destroy = async (req, res) => {
    const transaksi = await Transaksi.findOne({
        where: {
            id: req.params.id
        }
    })

    if (!transaksi) return res.status(404).json({
        msg: "Transaksi does not exist"
    })

    try {
        await Transaksi.destroy({
            where: {
                id: transaksi.id
            }
        })
        res.status(200).json({
            msg: "Transaksi deleted!"
        })
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
}