const express = require("express");
const { verifyUser, adminRole } = require("../../../middleware/AuthUser.js");
const {
    index,
    find_penjualan,
    pengembalian,
    PenjualanHarian,
    PenjualanMingguan,
    PenjualanBulanan,
    index_pembelian,
    find_pembelian,
    PembelianHari,
    PembelianMingguan,
    PembelianBulan,
    destroy,
    LaporanPenjualan,
    LaporanPembelian,
    refund,
} = require("./DetailController.js");

const router = express.Router();

router.get('/penjualan', verifyUser, index);
router.get('/penjualan/hari', verifyUser, PenjualanHarian);
router.get('/penjualan/minggu', verifyUser, PenjualanMingguan);
router.get('/penjualan/bulan', verifyUser, adminRole, PenjualanBulanan);
router.get('/penjualan/:id',verifyUser, adminRole, find_penjualan); 
router.put('/penjualan/return/:id',verifyUser, adminRole, pengembalian);
router.post('/penjualan/laporan', verifyUser, adminRole, LaporanPenjualan);

router.get('/pembelian',verifyUser, adminRole, index_pembelian);
router.get('/pembelian/:id',verifyUser, adminRole, find_pembelian);
router.get('/pembelian/detail/hari', verifyUser, adminRole, PembelianHari); 
router.get('/pembelian/detail/minggu', verifyUser, adminRole, PembelianMingguan);
router.get('/pembelian/detail/bulan', verifyUser, adminRole, PembelianBulan);
router.post('/pembelian/detail/laporan', verifyUser, adminRole, LaporanPembelian);

router.delete('/detail/:id', verifyUser, destroy);
router.post('/refund', verifyUser, adminRole, refund);

module.exports = router;
