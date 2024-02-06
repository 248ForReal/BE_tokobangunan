const express = require("express");
const { verifyUser, kasirRole, adminRole } = require("../../../middleware/AuthUser.js");
const {
    index,
    find,
    updateCartItemQuantity ,
    addOneQuantity,
    create,
    subtractOneQuantity,
    transaction,
    update,
    destroy
} = require("./CartItemController");

const router = express.Router();

router.get('/transaksi', verifyUser, index);
router.get('/transaksi/:id', verifyUser, find);
router.post('/transaksi', verifyUser,adminRole, create);
router.put('/transaksi/jumlah/:id_cart_item', updateCartItemQuantity);
router.put('/transaksi/tambah-quantity/:id_cart_item', addOneQuantity);
router.put('/transaksi/kurang-quantity/:id_cart_item', subtractOneQuantity);
router.delete('/transaksi/:id', verifyUser ,adminRole, destroy);
router.post('/transaction', verifyUser,adminRole,transaction);
module.exports = router;