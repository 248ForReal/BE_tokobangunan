const Barang = require("./BarangModel.js");
const fs = require('fs').promises;
const path = require('path');
const { Op } = require('sequelize');
exports.index = async (req, res) => {
    try { 
        const query = req.query.q || ''; 
        const searchQuery = {
            where: {
                [Op.or]: [
                    { nama_barang: { [Op.like]: `%${query}%` } },
                    { barcode_barang: { [Op.like]: `%${query}%`} },
                    { kategori_id: { [Op.like]: `%${query}%`} }
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
                barcode_barang: req.params.id
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
    const { barcode_barang, nama_barang, kategori_id, harga_modal, harga_jual, persen_keuntungan, stok } = req.body;

    try {
      
        const existingBarang = await Barang.findOne({
            where: {
                barcode_barang: barcode_barang
            }
        });


        if (existingBarang) {
            return res.status(400).json({
                msg: "Barcode already exists!"
            });
        }

  
        await Barang.create({
            barcode_barang,
            nama_barang,
            kategori_id,
            harga_modal,
            harga_jual,
            persen_keuntungan,
            stok
        });

      
        res.status(201).json({
            msg: "Successfully created!"
        });
    } catch (error) {
        
        res.status(400).json({
            msg: error.message
        });
    }
}

exports.update = async (req, res) => {
    try {
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

        const {barcode_barang, nama_barang, kategori_id,  harga_modal,harga_jual,persen_keuntungan, stok} = req.body;

    

        await barang.update({
            barcode_barang, nama_barang, kategori_id,  harga_modal,harga_jual,persen_keuntungan, stok 
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
                id: barang.id_barang
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