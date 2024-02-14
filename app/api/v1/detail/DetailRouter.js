const express = require("express");
const { verifyUser,adminRole } = require("../../../middleware/AuthUser.js");
const {
    index,
    find,
    findhariini,
    totalHarian,
    findmingguini,
    laporanBulanIni,
    destroy,
    refund
} = require("./DetailController.js");

const router = express.Router();

router.get('/detail', index);
router.get('/detail/total', verifyUser, totalHarian);
router.get('/detail/minggu', verifyUser, findmingguini);
router.get('/detail/laporan', verifyUser, laporanBulanIni);
router.get('/detail/:id', find);
router.delete('/detail/:id', verifyUser, destroy);
router.post('/refund',verifyUser,adminRole, refund);

module.exports = router;