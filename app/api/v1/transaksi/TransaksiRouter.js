const express = require("express");
const { verifyUser, kasirRole, adminRole } = require("../../../middleware/AuthUser.js");
const {
    transaction
} = require("./CartItemController");

const router = express.Router();


router.post('/transaction', verifyUser,transaction);
module.exports = router;