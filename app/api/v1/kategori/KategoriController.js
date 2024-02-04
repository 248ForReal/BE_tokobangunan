const Kategori = require("./KategoriModel.js");

exports.index = async (req, res) => {
    try {
        const response = await Kategori.findAll({})

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
        const response = await Kategori.findOne({
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
    try {
        const { kategori } = req.body;


        if (!kategori) {
            return res.status(400).json({
                msg: "Field 'kategori' is required."
            });
        }

   
        await Kategori.create({
            kategori: kategori
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
    try {
        
        const kategori = await Kategori.findByPk(req.params.id);

        if (!kategori) {
            return res.status(404).json({
                msg: "Kategori tidak ditemukan"
            });
        }

       
        const { kategori: updatedKategori } = req.body;

  
        await kategori.update({
            kategori: updatedKategori
        });

        res.status(200).json({
            msg: "Kategori berhasil diperbarui!"
        });
    } catch (error) {
        res.status(400).json({
            msg: error.message
        });
    }
};


exports.destroy = async (req, res) => {
    try {
        const kategori = await Kategori.findByPk(req.params.id);

        if (!kategori) {
            return res.status(404).json({
                msg: "Kategori tidak ditemukan"
            });
        }

        await kategori.destroy();


        res.status(200).json({
            msg: "Kategori berhasil dihapus!"
        });
    } catch (error) {
        res.status(400).json({
            msg: error.message
        });
    }
};
