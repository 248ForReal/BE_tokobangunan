const express = require("express");
const { verifyUser,adminRole } = require("../../../middleware/AuthUser.js");
const {
  index,
  find,
  create,
  update,
  destroy
} = require("./BarangController.js");

const router = express.Router();

router.get('/barang', verifyUser,adminRole, index);
router.get('/barang/:id', verifyUser,adminRole, find);
router.post('/barang', verifyUser,adminRole, create);
router.patch('/barang/:id', verifyUser,adminRole,  update);
router.delete('/barang/:id', verifyUser,adminRole, destroy);

module.exports = router;