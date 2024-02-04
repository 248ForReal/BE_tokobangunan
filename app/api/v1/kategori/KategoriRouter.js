const express = require("express");
const { verifyUser } = require("../../../middleware/AuthUser.js");
const {
    index,
    find,
    create,
    update,
    destroy
}= require("./KategoriController.js");

const router = express.Router();

router.get('/kategori', verifyUser,index);
router.get('/kategori/:id', verifyUser,find);
router.post('/kategori', verifyUser,create);
router.patch('/kategori/:id', verifyUser,update);
router.delete('/kategori/:id', verifyUser,destroy);

module.exports = router;