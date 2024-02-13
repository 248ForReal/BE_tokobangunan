const express = require("express");
const { verifyUser,adminRole } = require("../../../middleware/AuthUser.js");
const {
    index,
    find,
    create,
    update,
    destroy
}= require("./KategoriController.js");

const router = express.Router();

router.get('/kategori', verifyUser,adminRole,index);
router.get('/kategori/:id', verifyUser,adminRole,find);
router.post('/kategori', verifyUser,adminRole,create);
router.patch('/kategori/:id', verifyUser,adminRole,update);
router.delete('/kategori/:id', verifyUser,adminRole,destroy);

module.exports = router;