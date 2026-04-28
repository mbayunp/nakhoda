-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 28 Apr 2026 pada 13.41
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nakhoda_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `customers`
--

CREATE TABLE `customers` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(200) NOT NULL,
  `contact` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `customers`
--

INSERT INTO `customers` (`id`, `name`, `contact`, `address`, `notes`, `created_at`, `updated_at`) VALUES
(1, 'PT. Maju Bersama', '0812-3456-7890', 'Jl. Industri 10, Bandung', NULL, '2026-04-28 10:33:51', '2026-04-28 10:33:51'),
(2, 'Dinas Kesehatan Kab. Cianjur', '0823-4567-8901', 'Jl. Merdeka 45', NULL, '2026-04-28 10:54:07', '2026-04-28 10:54:07'),
(3, 'Bank BRI Cabang Cianjur1', '0813-5678-9012', 'Jl. Sudirman 12', '', '2026-04-28 10:54:07', '2026-04-28 10:57:08');

-- --------------------------------------------------------

--
-- Struktur dari tabel `materials`
--

CREATE TABLE `materials` (
  `id` int(10) UNSIGNED NOT NULL,
  `sku` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL,
  `category` enum('Kain','Aksesoris','Benang','Packaging','Lainnya') DEFAULT 'Lainnya',
  `stock` decimal(10,2) DEFAULT 0.00,
  `min_stock` decimal(10,2) DEFAULT 0.00,
  `unit` varchar(20) DEFAULT 'pcs',
  `supplier_name` varchar(200) DEFAULT NULL,
  `supplier_contact` varchar(100) DEFAULT NULL,
  `supplier_notes` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `materials`
--

INSERT INTO `materials` (`id`, `sku`, `name`, `category`, `stock`, `min_stock`, `unit`, `supplier_name`, `supplier_contact`, `supplier_notes`, `created_at`, `updated_at`) VALUES
(1, 'MAT-001', 'American Drill', 'Kain', 15.00, 50.00, 'yard', 'Toko Kain Bandung', NULL, NULL, '2026-04-28 10:33:51', '2026-04-28 10:33:51'),
(2, 'MAT-002', 'Kain TC', 'Kain', 100.00, 30.00, 'yard', NULL, NULL, NULL, '2026-04-28 10:54:07', '2026-04-28 10:54:07'),
(3, 'MAT-003', 'Benang Polyester', 'Benang', 5.00, 20.00, 'roll', NULL, NULL, NULL, '2026-04-28 10:54:07', '2026-04-28 10:54:07');

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `client_name` varchar(200) NOT NULL,
  `product` varchar(200) NOT NULL,
  `qty` int(11) NOT NULL DEFAULT 0,
  `sizes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '{ S:10, M:20, L:15, XL:5 }' CHECK (json_valid(`sizes`)),
  `deadline` date DEFAULT NULL,
  `status` enum('pending','cutting','sewing','decorating','finishing','delivered','cancelled') DEFAULT 'pending',
  `payment_status` enum('belum','dp','lunas') DEFAULT 'belum',
  `design_file` varchar(500) DEFAULT NULL,
  `material_cost` decimal(15,2) DEFAULT 0.00,
  `sewing_cost` decimal(15,2) DEFAULT 0.00,
  `printing_cost` decimal(15,2) DEFAULT 0.00,
  `overhead` decimal(15,2) DEFAULT 0.00,
  `margin` decimal(5,2) DEFAULT 20.00,
  `total` decimal(15,2) DEFAULT 0.00,
  `notes` text DEFAULT NULL,
  `customer_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `orders`
--

INSERT INTO `orders` (`id`, `client_name`, `product`, `qty`, `sizes`, `deadline`, `status`, `payment_status`, `design_file`, `material_cost`, `sewing_cost`, `printing_cost`, `overhead`, `margin`, `total`, `notes`, `customer_id`, `created_at`, `updated_at`) VALUES
(1, 'PT. Maju Bersama', 'Kemeja PDH', 300, NULL, '2026-05-10', 'sewing', 'dp', NULL, 25000.00, 5000000.00, 1000000.00, 500000.00, 25.00, 17500000.00, NULL, NULL, '2026-04-28 10:33:51', '2026-04-28 10:33:51'),
(2, 'Dinas Kesehatan', 'Kaos Polo', 200, NULL, '2026-05-03', 'cutting', 'dp', NULL, 18000.00, 3000000.00, 0.00, 0.00, 20.00, 7920000.00, NULL, NULL, '2026-04-28 10:54:07', '2026-04-28 10:54:07'),
(3, 'Bank BRI', 'Seragam Batik', 500, NULL, '2026-05-15', 'pending', 'belum', NULL, 35000.00, 8000000.00, 0.00, 0.00, 25.00, 31875000.00, NULL, NULL, '2026-04-28 10:54:07', '2026-04-28 10:54:07'),
(4, 'PT Telkom', 'Jaket Hoodie', 150, NULL, '2026-04-30', 'finishing', 'lunas', NULL, 40000.00, 4000000.00, 0.00, 0.00, 30.00, 13000000.00, NULL, NULL, '2026-04-28 10:54:07', '2026-04-28 10:54:07');

-- --------------------------------------------------------

--
-- Struktur dari tabel `portfolios`
--

CREATE TABLE `portfolios` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `category` enum('Kemeja','Kaos','Jaket','Seragam','Merchandise','Lainnya') NOT NULL DEFAULT 'Lainnya',
  `is_featured` tinyint(1) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `portfolios`
--

INSERT INTO `portfolios` (`id`, `title`, `description`, `image`, `category`, `is_featured`, `created_at`, `updated_at`) VALUES
(1, 'Seragam Kantor BUMN', 'Produksi 300 pcs seragam kantor', 'sample1.jpg', 'Seragam', 1, '2026-04-28 08:49:34', '2026-04-28 08:49:34'),
(2, 'Kaos Komunitas', 'Produksi kaos komunitas 150 pcs', 'sample2.jpg', 'Kaos', 0, '2026-04-28 08:49:34', '2026-04-28 08:49:34'),
(3, 'Jaket Event', 'Jaket untuk event kampus', 'sample3.jpg', 'Jaket', 1, '2026-04-28 08:49:34', '2026-04-28 08:49:34'),
(4, 'Seragam Dinas Tata Ruang', '500 pcs Kemeja PDH dengan bordir komputer, selesai dalam 14 hari kerja.', NULL, 'Kemeja', 1, '2026-04-28 09:16:20', '2026-04-28 09:16:20');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` int(10) UNSIGNED NOT NULL,
  `order_id` int(10) UNSIGNED DEFAULT NULL,
  `type` enum('income','expense') NOT NULL,
  `amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `method` varchar(50) DEFAULT NULL COMMENT 'transfer, cash, etc',
  `description` varchar(500) DEFAULT NULL,
  `date` date NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transactions`
--

INSERT INTO `transactions` (`id`, `order_id`, `type`, `amount`, `method`, `description`, `date`, `created_at`, `updated_at`) VALUES
(1, NULL, 'income', 13500000.00, 'transfer', 'DP Kemeja PDH - PT Maju', '2026-04-28', '2026-04-28 10:33:51', '2026-04-28 10:33:51');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','editor') DEFAULT 'admin',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Admin Nakhoda', 'admin@nakhoda.com', '$2b$12$zYuhp2bRJ.UNu5bhJ61R5O2V6na/9F3wrD3thQuFJDlkfoQx7xKwy', 'admin', '2026-04-28 08:49:25', '2026-04-28 09:04:57'),
(2, 'Muhammad Bayu Nurdiansyah Putra', 'muhammadbayunp@gmail.com', '$2b$12$QN1J1wjdv7r8XKSJANqhNegAvcX1WG6J38ncTfYHBZ/C1kL9BIuia', 'admin', '2026-04-28 10:17:22', '2026-04-28 10:17:22');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD UNIQUE KEY `sku_2` (`sku`),
  ADD UNIQUE KEY `sku_3` (`sku`);

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indeks untuk tabel `portfolios`
--
ALTER TABLE `portfolios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_portfolio_category` (`category`),
  ADD KEY `idx_portfolio_featured` (`is_featured`),
  ADD KEY `idx_portfolio_created` (`created_at`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `materials`
--
ALTER TABLE `materials`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `portfolios`
--
ALTER TABLE `portfolios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
