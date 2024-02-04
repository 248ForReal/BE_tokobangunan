const express = require("express");
const { verifyUser } = require("../../../middleware/AuthUser.js");
const {
    index,
    find,
    create,
    update,
    destroy
} = require("./TransaksiController.js");

const router = express.Router();

router.get('/transaksi', verifyUser, index);
router.get('/transaksi/:id', verifyUser, find);
router.post('/transaksi', verifyUser, create);
router.patch('/transaksi/:id', verifyUser, update);
router.delete('/transaksi/:id', verifyUser, destroy);

module.exports = router;