-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 23, 2024 at 09:39 AM
-- Server version: 8.0.30
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tokobangunan`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `nama_admin` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `uuid`, `nama_admin`, `username`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'b8a5b84b-f94f-4e0c-8d18-68aa02cdf009', 'admin', 'admin', '$argon2id$v=19$m=65536,t=3,p=4$/RSEecNRjr6OaH9jrdv6VQ$hWfOhSeNuDS2+i+2oU1S8IzLIjepXJ/630y6CClE62M', 'admin', '2024-02-03 06:49:46', '2024-02-04 08:07:42'),
(3, '68f8a935-f7c5-41b3-90e2-0231445937b5', 'kasir', 'kasir', '$argon2id$v=19$m=65536,t=3,p=4$g9EDidXid0nm/FwqFfWaXw$mFUutJEQOnGq11b4MLQ6IbMB8QdUEUdB36JN2r8X0+8', 'kasir', '2024-02-13 21:21:57', '2024-02-13 21:21:57');

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id` int NOT NULL,
  `barcode_barang` int NOT NULL,
  `nama_barang` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `kategori_id` int DEFAULT NULL,
  `harga_modal` float NOT NULL,
  `harga_jual` float DEFAULT NULL,
  `persen_keuntungan` float DEFAULT NULL,
  `stok` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id`, `barcode_barang`, `nama_barang`, `kategori_id`, `harga_modal`, `harga_jual`, `persen_keuntungan`, `stok`, `createdAt`, `updatedAt`) VALUES
(1, 1234567891, 'kran Taman Steinless', 1, 10000, 15000, 0.5, 100, '2024-02-13 22:05:52', '2024-02-21 15:09:00'),
(2, 1234567892, 'Kran Angsa SOLEGON', 1, 42000, 52000, 0.3, 100, '2024-02-13 22:06:07', '2024-02-13 22:40:59'),
(3, 1234567894, 'Kran Angsa ONO', 1, 68000, 88000, 0.3, 100, '2024-02-13 22:06:46', '2024-02-13 22:06:46'),
(4, 1234567895, 'Saklar Seri', 1, 8000, 10400, 0.3, 100, '2024-02-13 22:06:56', '2024-02-13 22:06:56'),
(5, 1234567896, 'Plat Panasonic 3L', 1, 9000, 11700, 0.3, 100, '2024-02-13 22:07:07', '2024-02-13 22:07:07'),
(6, 1234567898, 'Plat Panasonic 1L', 1, 9000, 11700, 0.3, 131, '2024-02-13 22:07:27', '2024-02-23 16:35:16'),
(7, 1234567899, 'Stop Kontak Panasonic', 1, 10000, 13000, 0.3, 100, '2024-02-13 22:07:39', '2024-02-13 22:07:39'),
(8, 1234567910, 'Fitling Gantungan Hitam Voltama', 1, 5000, 6500, 0.3, 100, '2024-02-13 22:08:00', '2024-02-13 22:08:00'),
(9, 1234567893, 'Kran Angsa CAB', 1, 30000, 39000, 0.3, 165, '2024-02-13 22:09:26', '2024-02-23 16:35:16'),
(10, 1234567897, 'Plat Panasonic 2L', 1, 9000, 11700, 0.3, 100, '2024-02-13 22:09:39', '2024-02-13 22:09:39');

-- --------------------------------------------------------

--
-- Table structure for table `kategoris`
--

CREATE TABLE `kategoris` (
  `id` int NOT NULL,
  `kategori` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategoris`
--

INSERT INTO `kategoris` (`id`, `kategori`, `createdAt`, `updatedAt`) VALUES
(1, 'perkakas', '2024-02-04 11:33:46', '2024-02-04 11:54:00');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text COLLATE utf8mb4_general_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('oLDOwHsKHyvlm2z-0Os9h_oufBi3DDTr', '2024-02-24 16:35:16', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"b8a5b84b-f94f-4e0c-8d18-68aa02cdf009\"}', '2024-02-21 10:13:18', '2024-02-23 16:35:16');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int NOT NULL,
  `id_transaksi` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `total_belanja` float NOT NULL,
  `jumlah_dibayarkan` float NOT NULL,
  `kembalian` float NOT NULL,
  `items` json NOT NULL,
  `nama_admin` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id`, `id_transaksi`, `total_belanja`, `jumlah_dibayarkan`, `kembalian`, `items`, `nama_admin`, `createdAt`, `updatedAt`) VALUES
(1, 'T2024-02-21001', 39000, 100000, 61000, '[{\"jumlah_modal_keseluruhan\": 30000}, {\"id\": 9, \"quantity\": 1, \"harga_modal\": 30000, \"nama_barang\": \"Kran Angsa CAB\", \"total_harga\": 39000, \"jumlah_modal\": 30000, \"harga_per_barang\": 39000}]', 'admin', '2024-02-21 15:13:07', '2024-02-22 04:16:17'),
(3, 'T2024-02-21002', 50700, 100000, 49300, '[{\"jumlah_modal_keseluruhan\": 39000}, {\"id\": 6, \"quantity\": 1, \"harga_modal\": 9000, \"nama_barang\": \"Plat Panasonic 1L\", \"total_harga\": 11700, \"jumlah_modal\": 9000, \"harga_per_barang\": 11700}, {\"id\": 9, \"quantity\": 1, \"harga_modal\": 30000, \"nama_barang\": \"Kran Angsa CAB\", \"total_harga\": 39000, \"jumlah_modal\": 30000, \"harga_per_barang\": 39000}]', 'admin', '2024-02-22 03:54:08', '2024-02-22 03:54:08'),
(4, 'T2024-02-22001', 39000, 100000, 61000, '[{\"jumlah_modal_keseluruhan\": 30000}, {\"id\": 9, \"quantity\": 1, \"harga_modal\": 30000, \"nama_barang\": \"Kran Angsa CAB\", \"total_harga\": 39000, \"jumlah_modal\": 30000, \"harga_per_barang\": 39000}]', 'admin', '2024-02-22 09:01:18', '2024-02-22 09:01:18'),
(5, 'T2024-02-22002', 39000, 100000, 61000, '[{\"jumlah_modal_keseluruhan\": 30000}, {\"id\": 9, \"quantity\": 1, \"harga_modal\": 30000, \"nama_barang\": \"Kran Angsa CAB\", \"total_harga\": 39000, \"jumlah_modal\": 30000, \"harga_per_barang\": 39000}]', 'admin', '2024-02-22 09:01:23', '2024-02-22 09:01:23'),
(6, 'T2024-02-22003', 39000, 100000, 61000, '[{\"jumlah_modal_keseluruhan\": 30000}, {\"id\": 9, \"quantity\": 1, \"harga_modal\": 30000, \"nama_barang\": \"Kran Angsa CAB\", \"total_harga\": 39000, \"jumlah_modal\": 30000, \"harga_per_barang\": 39000}]', 'admin', '2024-02-22 09:01:28', '2024-02-22 09:01:28'),
(7, 'T2024-02-23001', 101400, 105000, 3600, '[{\"jumlah_modal_keseluruhan\": 78000}, {\"id\": 6, \"quantity\": 2, \"harga_modal\": 9000, \"nama_barang\": \"Plat Panasonic 1L\", \"total_harga\": 11700, \"jumlah_modal\": 18000, \"harga_per_barang\": 11700}, {\"id\": 9, \"quantity\": 2, \"harga_modal\": 30000, \"nama_barang\": \"Kran Angsa CAB\", \"total_harga\": 39000, \"jumlah_modal\": 60000, \"harga_per_barang\": 39000}]', 'admin', '2024-02-23 15:53:17', '2024-02-23 16:35:16');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_barang`
--

CREATE TABLE `transaksi_barang` (
  `id` int NOT NULL,
  `total_belanja` float NOT NULL,
  `kembalian` float NOT NULL,
  `items` json NOT NULL,
  `nama_admin` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaksi_barang`
--

INSERT INTO `transaksi_barang` (`id`, `total_belanja`, `kembalian`, `items`, `nama_admin`, `createdAt`, `updatedAt`) VALUES
(1, 216000, 84000, '[{\"id\": 6, \"quantity\": 4, \"harga_modal\": 9000, \"nama_barang\": \"Plat Panasonic 1L\", \"total_harga\": 36000}, {\"id\": 9, \"quantity\": 6, \"harga_modal\": 30000, \"nama_barang\": \"Kran Angsa CAB\", \"total_harga\": 180000}]', 'admin', '2024-02-22 03:29:57', '2024-02-22 03:29:57'),
(2, 390000, 10000, '[{\"id\": 6, \"quantity\": 10, \"harga_modal\": 9000, \"nama_barang\": \"Plat Panasonic 1L\", \"total_harga\": 90000}, {\"id\": 9, \"quantity\": 10, \"harga_modal\": 30000, \"nama_barang\": \"Kran Angsa CAB\", \"total_harga\": 300000}]', 'admin', '2024-02-22 04:02:59', '2024-02-22 04:02:59'),
(3, 390000, 10000, '[{\"id\": 6, \"quantity\": 10, \"harga_modal\": 9000, \"nama_barang\": \"Plat Panasonic 1L\", \"total_harga\": 90000}, {\"id\": 9, \"quantity\": 10, \"harga_modal\": 30000, \"nama_barang\": \"Kran Angsa CAB\", \"total_harga\": 300000}]', 'admin', '2024-02-22 04:03:29', '2024-02-22 04:03:29'),
(4, 390000, 10000, '[{\"id\": 1, \"quantity\": 10, \"harga_modal\": 9000, \"nama_barang\": \"Plat Panasonic 1L\", \"total_harga\": 90000}, {\"id\": 9, \"quantity\": 10, \"harga_modal\": 30000, \"nama_barang\": \"Kran Angsa CAB\", \"total_harga\": 300000}]', 'admin', '2024-02-22 04:05:03', '2024-02-22 04:05:03'),
(5, 390000, 10000, '[{\"id\": 6, \"quantity\": 10, \"harga_modal\": 9000, \"nama_barang\": \"Plat Panasonic 1L\", \"total_harga\": 90000}, {\"id\": 9, \"quantity\": 10, \"harga_modal\": 30000, \"nama_barang\": \"Kran Angsa CAB\", \"total_harga\": 300000}]', 'admin', '2024-02-22 04:08:31', '2024-02-22 04:08:31'),
(6, 390000, 10000, '[{\"id\": 6, \"quantity\": 10, \"harga_modal\": 9000, \"nama_barang\": \"Plat Panasonic 1L\", \"total_harga\": 90000}, {\"id\": 9, \"quantity\": 10, \"harga_modal\": 30000, \"nama_barang\": \"Kran Angsa CAB\", \"total_harga\": 300000}]', 'admin', '2024-02-22 04:08:59', '2024-02-22 04:08:59'),
(7, 390000, 10000, '[{\"id\": 6, \"quantity\": 10, \"harga_modal\": 9000, \"nama_barang\": \"Plat Panasonic 1L\", \"total_harga\": 90000}, {\"id\": 9, \"quantity\": 10, \"harga_modal\": 30000, \"nama_barang\": \"Kran Angsa CAB\", \"total_harga\": 300000}]', 'admin', '2024-02-22 04:09:32', '2024-02-22 04:09:32'),
(8, 500000, 100000, '[{\"id\": 6, \"quantity\": 4, \"harga_modal\": 9000, \"nama_barang\": \"Plat Panasonic 1L\", \"total_harga\": 36000}, {\"id\": 9, \"quantity\": 6, \"harga_modal\": 30000, \"nama_barang\": \"Kran Angsa CAB\", \"total_harga\": 180000}]', 'admin', '2024-02-23 13:49:32', '2024-02-23 13:49:32'),
(9, 216000, 34000, '[{\"id\": 6, \"quantity\": 4, \"harga_modal\": 9000, \"nama_barang\": \"Plat Panasonic 1L\", \"total_harga\": 36000}, {\"id\": 9, \"quantity\": 6, \"harga_modal\": 30000, \"nama_barang\": \"Kran Angsa CAB\", \"total_harga\": 180000}]', 'admin', '2024-02-23 16:00:56', '2024-02-23 16:00:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategori_id` (`kategori_id`);

--
-- Indexes for table `kategoris`
--
ALTER TABLE `kategoris`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_transaksi` (`id_transaksi`);

--
-- Indexes for table `transaksi_barang`
--
ALTER TABLE `transaksi_barang`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `kategoris`
--
ALTER TABLE `kategoris`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `transaksi_barang`
--
ALTER TABLE `transaksi_barang`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `barang`
--
ALTER TABLE `barang`
  ADD CONSTRAINT `barang_ibfk_1` FOREIGN KEY (`kategori_id`) REFERENCES `kategoris` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
