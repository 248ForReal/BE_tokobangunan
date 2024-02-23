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

router.get('/penjualan', index);
router.get('/penjualan/hari', verifyUser, PenjualanHarian);
router.get('/penjualan/minggu', verifyUser, PenjualanMingguan);
router.get('/penjualan/bulan', verifyUser, PenjualanBulanan);
router.get('/penjualan/:id', find_penjualan); // Perhatikan perubahan nama fungsi menjadi find_penjualan
router.put('/penjualan/return/:id', pengembalian);
router.post('/penjualan/laporan', verifyUser, LaporanPenjualan);

router.get('/pembelian', index_pembelian);
router.get('/pembelian/:id', find_pembelian);
router.get('/pembelian/detail/hari', verifyUser, PembelianHari); // Perbaikan pada nama rute
router.get('/pembelian/detail/minggu', verifyUser, PembelianMingguan);
router.get('/pembelian/detail/bulan', verifyUser, PembelianBulan);
router.post('/pembelian/detail/laporan', verifyUser, LaporanPembelian);

router.delete('/detail/:id', verifyUser, destroy);
router.post('/refund', verifyUser, adminRole, refund);

module.exports = router;
