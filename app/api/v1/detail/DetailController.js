const Detail = require("./DetailModel.js");

exports.index = async (req, res) => {
    try {
        const response = await Detail.findAll({});

        res.status(200).json({
            data: response
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
};

exports.find = async (req, res) => {
    try {
        const response = await Detail.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            data: response
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
};

exports.create = async (req, res) => {
    const { id_detail_transaksi, transaksi_id, barang_id, jumlah, harga } = req.body;

    try {
        await Detail.create({
            id_detail_transaksi: id_detail_transaksi,
            transaksi_id: transaksi_id,
            barang_id: barang_id,
            jumlah: jumlah,
            harga: harga
        });
        res.status(201).json({
            msg: "Successfully created!"
        });
    } catch (error) {
        res.status(400).json({
            msg: error.message
        });
    }
};

exports.update = async (req, res) => {
    const detail = await Detail.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!detail) return res.status(404).json({
        msg: "Detail does not exist"
    });

    const { id_detail_transaksi, transaksi_id, barang_id, jumlah, harga } = req.body;

    try {
        await Detail.update(
            {
                id_detail_transaksi: id_detail_transaksi,
                transaksi_id: transaksi_id,
                barang_id: barang_id,
                jumlah: jumlah,
                harga: harga
            },
            {
                where: {
                    id: detail.id
                }
            }
        );
        res.status(200).json({
            msg: "Detail updated!"
        });
    } catch (error) {
        res.status(400).json({
            msg: error.message
        });
    }
};

exports.destroy = async (req, res) => {
    const detail = await Detail.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!detail) return res.status(404).json({
        msg: "Detail does not exist"
    });

    try {
        await Detail.destroy({
            where: {
                id: detail.id
            }
        });
        res.status(200).json({
            msg: "Detail deleted!"
        });
    } catch (error) {
        res.status(400).json({
            msg: error.message
        });
    }
};