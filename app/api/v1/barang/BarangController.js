const Barang = require("./BarangModel.js");
const  uploadMiddleware = require("../../../../multer.js");
const fs = require('fs').promises;
const path = require('path');
const { Op } = require('sequelize');
exports.index = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const query = req.query.q || ''; 
        const searchQuery = {
            where: {
                [Op.or]: [
                    { nama_barang: { [Op.like]: `%${query}%` } },
                    { id_barang: { [Op.like]: `%${query}%`} }
                ]
            },
        };
        const response = await Barang.findAndCountAll(searchQuery);
        res.status(200).json({
            data: response.rows,
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
};


exports.find = async (req, res) => {
    try {
        const response = await Barang.findOne({
            where: {
                id_barang: req.params.id
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
    uploadMiddleware.single('gambar')(req, res, async (err) => {
        if (err) {
            console.log(err); 

        }

        const { id_barang, nama_barang, kategori_id, harga, stok } = req.body;
        let gambar = null; 
        if (req.file) {
            gambar = req.file.filename;
        }

        try {
            await Barang.create({
                id_barang,
                nama_barang,
                kategori_id,
                harga,
                stok,
                gambar
            });

            res.status(201).json({
                msg: "Successfully created!"
            });
        } catch (error) {
            res.status(400).json({
                msg: error.message
            });
        }
    });
}


exports.update = async (req, res) => {
    try {
        const barang = await Barang.findOne({
            where: {
                id_barang: req.params.id
            }
        });

        if (!barang) {
            return res.status(404).json({
                msg: "Barang does not exist"
            });
        }

        const { id_barang, nama_barang, kategori_id, harga, stok } = req.body;
        let gambar = barang.gambar; 

        if (req.file) {
            gambar = req.file.filename;

            if (barang.gambar) {
                const oldImagePath = path.join(__dirname, '../../../../image', barang.gambar);
                await fs.unlink(oldImagePath);
            }
        }

        await barang.update({
            id_barang,
            nama_barang,
            kategori_id,
            harga,
            stok,
            gambar: gambar 
        });

        res.status(200).json({
            msg: "Barang updated!"
        });
    } catch (error) {
        res.status(400).json({
            msg: error.message
        });
    }
};

exports.destroy = async (req, res) => {
    const barang = await Barang.findOne({
        where: {
            id_barang: req.params.id
        }
    })

    if (!barang) return res.status(404).json({
        msg: "Barang does not exist"
    })

    try {
        await Barang.destroy({
            where: {
                id_barang: barang.id_barang
            }
        })
        res.status(200).json({
            msg: "Barang deleted!"
        })
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
}