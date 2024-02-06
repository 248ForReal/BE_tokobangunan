const express = require("express");
const { verifyUser } = require("../../../middleware/AuthUser.js");
const {
    index,
    find,
    findhariini,
    findmingguini,
    findbulanini,
    destroy
} = require("./DetailController.js");

const router = express.Router();

router.get('/detail', verifyUser, index);
router.get('/detail/hari', verifyUser, findhariini);
router.get('/detail/minggu', verifyUser, findmingguini);
router.get('/detail/bulan', verifyUser, findbulanini);
router.get('/detail/:id', verifyUser, find);
router.delete('/detail/:id', verifyUser, destroy);

module.exports = router;