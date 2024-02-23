const express = require("express");
const { verifyUser, kasirRole, adminRole } = require("../../../middleware/AuthUser.js");
const {
    transaction_beli,
    transaction_jual
} = require("./CartItemController");

const router = express.Router();



router.post('/transaction/jual', verifyUser,transaction_jual);
router.post('/transaction/beli', verifyUser,transaction_beli);

module.exports = router;