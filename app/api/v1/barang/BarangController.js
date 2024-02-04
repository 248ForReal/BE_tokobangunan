const Barang = require("./BarangModel.js");
const  uploadMiddleware = require("../../../../multer.js");
const fs = require('fs').promises;
const path = require('path');
exports.index = async (req, res) => {
    try {
       const response = await Barang.findAll({})

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
        const response = await Barang.findOne({
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
    uploadMiddleware.single('gambar')(req, res, async (err) => {
        if (err) {
            console.log(err); 
            return res.status(400).json({ msg: "Error uploading image" });
        }

        const { id_barang, nama_barang, kategori_id, harga, stok } = req.body;
        const gambar = req.file ? req.file.filename : null;

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
    const barang = await Barang.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!barang) {
        return res.status(404).json({
            msg: "Barang does not exist"
        });
    }

    const { id_barang, nama_barang, kategori_id, harga, stok } = req.body;
    const { gambar } = req.file; 

    try {
        
        if (barang.gambar) {
            const oldImagePath = path.join(__dirname, '../../../../image', barang.gambar);
            await fs.unlink(oldImagePath);
        }

    
        await barang.update({
            id_barang,
            nama_barang,
            kategori_id,
            harga,
            stok,
            gambar: gambar ? gambar.filename : null 
        }, {
            where: {
                id: barang.id
            }
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
            id: req.params.id
        }
    })

    if (!barang) return res.status(404).json({
        msg: "Barang does not exist"
    })

    try {
        await Barang.destroy({
            where: {
                id: barang.id
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