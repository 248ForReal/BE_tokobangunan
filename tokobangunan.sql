-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 06, 2024 at 01:58 PM
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
(1, 'b8a5b84b-f94f-4e0c-8d18-68aa02cdf009', 'John Doe', 'john_doe123', '$argon2id$v=19$m=65536,t=3,p=4$/RSEecNRjr6OaH9jrdv6VQ$hWfOhSeNuDS2+i+2oU1S8IzLIjepXJ/630y6CClE62M', 'admin', '2024-02-03 06:49:46', '2024-02-04 08:07:42');

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id_barang` int NOT NULL,
  `nama_barang` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gambar` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `kategori_id` int DEFAULT NULL,
  `harga` float DEFAULT NULL,
  `stok` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id_barang`, `nama_barang`, `gambar`, `kategori_id`, `harga`, `stok`, `createdAt`, `updatedAt`) VALUES
(1213115553, 'cangkul', '1707222681332-11.png', 1, 14000, 19, '2024-02-06 12:31:21', '2024-02-06 12:56:29'),
(2135465465, 'palu', '1707222353397-warung CK (2).png', 1, 75000, 8, '2024-02-06 12:25:53', '2024-02-06 12:56:29');

-- --------------------------------------------------------

--
-- Table structure for table `cartitems`
--

CREATE TABLE `cartitems` (
  `id_cart_item` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `total_harga` float DEFAULT NULL,
  `nama_admin` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_barang` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cartitems`
--

INSERT INTO `cartitems` (`id_cart_item`, `quantity`, `total_harga`, `nama_admin`, `id_barang`, `createdAt`, `updatedAt`) VALUES
(1, 1, 14000, 'John Doe', 1213115553, '2024-02-06 13:57:24', '2024-02-06 13:57:24'),
(2, 1, 75000, 'John Doe', 2135465465, '2024-02-06 13:57:47', '2024-02-06 13:57:47');

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
('2aXspt4_KUsO6_o_7bR_TPyP981v_SKq', '2024-02-07 13:57:47', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"b8a5b84b-f94f-4e0c-8d18-68aa02cdf009\"}', '2024-02-04 07:45:34', '2024-02-06 13:57:47');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int NOT NULL,
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

INSERT INTO `transaksi` (`id_transaksi`, `total_belanja`, `jumlah_dibayarkan`, `kembalian`, `items`, `nama_admin`, `createdAt`, `updatedAt`) VALUES
(2, 150000, 200000, 50000, '\"[{\\\"nama_barang\\\":\\\"palu\\\",\\\"quantity\\\":150000}]\"', 'John Doe', '2024-02-06 10:25:14', '2024-02-06 10:25:14'),
(3, 150000, 200000, 50000, '\"[{\\\"nama_barang\\\":\\\"palu\\\",\\\"quantity\\\":\\\"2\\\",\\\"total_harga\\\":150000}]\"', 'John Doe', '2024-02-06 12:30:04', '2024-02-06 12:30:04'),
(4, 417000, 500000, 83000, '\"[{\\\"nama_barang\\\":\\\"palu\\\",\\\"quantity\\\":\\\"5\\\",\\\"total_harga\\\":375000},{\\\"nama_barang\\\":\\\"cangkul\\\",\\\"quantity\\\":\\\"3\\\",\\\"total_harga\\\":42000}]\"', 'John Doe', '2024-02-06 12:35:11', '2024-02-06 12:35:11'),
(5, 417000, 500000, 83000, '\"[\\n  {\\n    \\\"nama_barang\\\": \\\"palu\\\",\\n    \\\"quantity\\\": \\\"5\\\",\\n    \\\"total_harga\\\": 375000\\n  },\\n  {\\n    \\\"nama_barang\\\": \\\"cangkul\\\",\\n    \\\"quantity\\\": \\\"3\\\",\\n    \\\"total_harga\\\": 42000\\n  }\\n]\"', 'John Doe', '2024-02-06 12:37:19', '2024-02-06 12:37:19'),
(6, 417000, 500000, 83000, '\"[\\n  {\\n    \\\"nama_barang\\\": \\\"palu\\\",\\n    \\\"quantity\\\": \\\"5\\\",\\n    \\\"total_harga\\\": 375000\\n  },\\n  {\\n    \\\"nama_barang\\\": \\\"cangkul\\\",\\n    \\\"quantity\\\": \\\"3\\\",\\n    \\\"total_harga\\\": 42000\\n  }\\n]\"', 'John Doe', '2024-02-06 12:38:43', '2024-02-06 12:38:43'),
(7, 417000, 500000, 83000, '\"[\\n  {\\n    \\\"nama_barang\\\": \\\"palu\\\",\\n    \\\"quantity\\\": \\\"5\\\",\\n    \\\"total_harga\\\": 375000\\n  },\\n  {\\n    \\\"nama_barang\\\": \\\"cangkul\\\",\\n    \\\"quantity\\\": \\\"3\\\",\\n    \\\"total_harga\\\": 42000\\n  }\\n]\"', 'John Doe', '2024-02-06 12:41:10', '2024-02-06 12:41:10'),
(8, 417000, 500000, 83000, '\"[{\\\"nama_barang\\\":\\\"palu\\\",\\\"quantity\\\":\\\"5\\\",\\\"total_harga\\\":375000},{\\\"nama_barang\\\":\\\"cangkul\\\",\\\"quantity\\\":\\\"3\\\",\\\"total_harga\\\":42000}]\"', 'John Doe', '2024-02-06 12:52:53', '2024-02-06 12:52:53'),
(9, 417000, 500000, 83000, '\"[{\\\"nama_barang\\\":\\\"palu\\\",\\\"quantity\\\":\\\"5\\\",\\\"total_harga\\\":375000},{\\\"nama_barang\\\":\\\"cangkul\\\",\\\"quantity\\\":\\\"3\\\",\\\"total_harga\\\":42000}]\"', 'John Doe', '2024-02-06 12:56:29', '2024-02-06 12:56:29');

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
  ADD PRIMARY KEY (`id_barang`),
  ADD KEY `kategori_id` (`kategori_id`);

--
-- Indexes for table `cartitems`
--
ALTER TABLE `cartitems`
  ADD PRIMARY KEY (`id_cart_item`),
  ADD KEY `id_barang` (`id_barang`);

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
  ADD PRIMARY KEY (`id_transaksi`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cartitems`
--
ALTER TABLE `cartitems`
  MODIFY `id_cart_item` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `kategoris`
--
ALTER TABLE `kategoris`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `barang`
--
ALTER TABLE `barang`
  ADD CONSTRAINT `barang_ibfk_1` FOREIGN KEY (`kategori_id`) REFERENCES `kategoris` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `cartitems`
--
ALTER TABLE `cartitems`
  ADD CONSTRAINT `cartitems_ibfk_1` FOREIGN KEY (`id_barang`) REFERENCES `barang` (`id_barang`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
