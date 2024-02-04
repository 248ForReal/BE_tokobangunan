const express = require("express");
const { verifyUser } = require("../../../middleware/AuthUser.js");
const upload = require("../../../../multer.js");
const {
  index,
  find,
  create,
  update,
  destroy
} = require("./BarangController.js");

const router = express.Router();

router.get('/barang', verifyUser, index);
router.get('/barang/:id', verifyUser, find);
router.post('/barang', verifyUser, create);
router.patch('/barang/:id', verifyUser, upload.single('gambar'), update);
router.delete('/barang/:id', verifyUser, destroy);

module.exports = router;