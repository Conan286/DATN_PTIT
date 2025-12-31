-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 31, 2025 at 02:50 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `goalguard`
--

-- --------------------------------------------------------

--
-- Table structure for table `areas`
--

CREATE TABLE `areas` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `areas`
--

INSERT INTO `areas` (`id`, `name`, `status`) VALUES
(1, 'Thanh Xuân', 'active'),
(2, 'Hà Đông', 'active'),
(3, 'Đống Đa', 'active'),
(4, 'Nam Từ Liêm', 'active'),
(5, 'Cầu Giấy', 'active'),
(6, 'Hoàng Mai', 'active'),
(7, 'Hai Bà Trưng', 'active'),
(8, 'Long Biên', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `court_id` int(11) NOT NULL,
  `booking_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` varchar(255) DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `court_id`, `booking_date`, `start_time`, `end_time`, `payment_method`, `total_amount`, `status`) VALUES
(2, 8, 12, '2025-12-02', '07:30:00', '14:30:00', 'Chuyển khoản', 2100000.00, 'final'),
(3, 8, 7, '2025-12-03', '07:00:00', '09:00:00', 'Chuyển khoản', 460773.95, 'final'),
(4, 9, 3, '2025-12-03', '07:00:00', '10:00:00', 'Thanh toán trực tiếp', 360000.00, 'final'),
(5, 8, 7, '2025-12-04', '18:00:00', '20:00:00', 'Thanh toán trực tiếp', 464646.00, 'pending'),
(6, 8, 13, '2025-12-06', '07:00:00', '10:00:00', 'Chuyển khoản', 600000.00, 'final'),
(7, 8, 27, '2025-12-06', '07:00:00', '12:00:00', 'Thanh toán trực tiếp', 996666.67, 'final'),
(8, 3, 12, '2025-12-12', '07:00:00', '11:00:00', 'Thanh toán trực tiếp', 1195000.00, 'final'),
(10, 3, 4, '2025-12-06', '16:00:00', '19:00:00', 'Thanh toán trực tiếp', 358000.00, 'final'),
(11, 3, 3, '2025-12-07', '09:00:00', '11:00:00', 'Thanh toán trực tiếp', 240000.00, 'final'),
(12, 3, 24, '2025-12-18', '18:00:00', '20:00:00', 'Chuyển khoản', 420000.00, 'pending'),
(13, 13, 8, '2025-12-18', '09:00:00', '10:00:00', 'Chuyển khoản', 275333.33, 'final'),
(14, 13, 28, '2025-12-19', '08:00:00', '10:00:00', 'Thanh toán trực tiếp', 500000.00, 'final'),
(15, 13, 20, '2025-12-23', '17:00:00', '18:00:00', 'Thanh toán trực tiếp', 245833.33, 'final'),
(16, 13, 8, '2025-12-16', '12:00:00', '18:00:00', 'Thanh toán trực tiếp', 1675333.33, 'final'),
(17, 13, 28, '2025-12-16', '07:00:00', '10:00:00', 'Thanh toán trực tiếp', 745833.33, 'final'),
(18, 13, 28, '2025-12-15', '15:00:00', '17:00:00', 'Thanh toán trực tiếp', 569583.33, 'pending'),
(19, 13, 28, '2025-12-15', '09:00:00', '10:00:00', 'Thanh toán trực tiếp', 250000.00, 'final'),
(20, 13, 28, '2025-12-16', '15:00:00', '16:00:00', 'Thanh toán trực tiếp', 245833.33, 'final'),
(21, 13, 28, '2025-12-20', '16:00:00', '17:00:00', 'Thanh toán trực tiếp', 325000.00, 'final'),
(24, 13, 15, '2025-12-20', '16:00:00', '18:00:00', 'Thanh toán trực tiếp', 250000.00, 'final'),
(25, 12, 8, '2025-12-16', '19:00:00', '20:00:00', 'Thanh toán trực tiếp', 350000.00, 'pending'),
(26, 12, 8, '2025-12-16', '20:30:00', '21:30:00', 'Thanh toán trực tiếp', 350000.00, 'final'),
(27, 12, 12, '2025-12-26', '15:00:00', '17:00:00', 'Thanh toán trực tiếp', 675000.00, 'pending'),
(28, 12, 12, '2025-12-17', '20:00:00', '22:00:00', 'Thanh toán trực tiếp', 750000.00, 'pending'),
(29, 13, 20, '2025-12-24', '15:00:00', '18:00:00', 'Thanh toán trực tiếp', 875000.00, 'pending'),
(30, 13, 27, '2025-12-17', '15:00:00', '17:00:00', 'Thanh toán trực tiếp', 450000.00, 'final'),
(31, 8, 27, '2025-12-18', '12:00:00', '16:00:00', 'Thanh toán trực tiếp', 800000.00, 'final'),
(33, 8, 8, '2025-12-20', '10:00:00', '18:00:00', 'Thanh toán trực tiếp', 2380000.00, 'pending'),
(34, 8, 1, '2025-12-24', '10:00:00', '15:00:00', 'Chuyển khoản', 600000.00, 'final'),
(37, 8, 1, '2025-12-20', '12:00:00', '16:00:00', 'Thanh toán trực tiếp', 480000.00, 'pending'),
(38, 8, 8, '2025-12-24', '19:30:00', '21:30:00', 'Thanh toán trực tiếp', 700000.00, 'pending'),
(39, 8, 6, '2025-12-21', '16:00:00', '18:00:00', 'Chuyển khoản', 800000.00, 'final'),
(40, 13, 8, '2025-12-24', '18:00:00', '19:00:00', 'Thanh toán trực tiếp', 350000.00, 'final'),
(41, 13, 3, '2025-12-28', '07:00:00', '09:00:00', 'Thanh toán trực tiếp', 240000.00, 'final'),
(42, 9, 28, '2025-12-21', '16:00:00', '19:00:00', 'Thanh toán trực tiếp', 937500.00, 'final'),
(43, 9, 4, '2025-12-22', '08:00:00', '10:00:00', 'Thanh toán trực tiếp', 240000.00, 'pending'),
(44, 12, 15, '2025-12-23', '10:00:00', '12:00:00', 'Thanh toán trực tiếp', 200000.00, 'final'),
(45, 12, 3, '2025-12-22', '10:00:00', '12:00:00', 'Thanh toán trực tiếp', 240000.00, 'final'),
(46, 13, 33, '2025-12-24', '17:00:00', '19:00:00', 'Thanh toán trực tiếp', 6250000.00, 'pending'),
(47, 13, 6, '2025-12-22', '18:00:00', '21:00:00', 'Thanh toán trực tiếp', 1200000.00, 'final'),
(48, 13, 13, '2025-12-24', '10:00:00', '14:00:00', 'Thanh toán trực tiếp', 800000.00, 'final'),
(49, 13, 6, '2025-12-30', '09:00:00', '11:00:00', 'Thanh toán trực tiếp', 640000.00, 'pending'),
(50, 13, 37, '2025-12-24', '07:00:00', '10:00:00', 'Thanh toán trực tiếp', 840000.00, 'pending'),
(51, 13, 28, '2025-12-24', '15:00:00', '19:00:00', 'Thanh toán trực tiếp', 1187500.00, 'final'),
(52, 9, 12, '2025-12-26', '07:00:00', '09:00:00', 'Thanh toán trực tiếp', 600000.00, 'pending'),
(53, 9, 38, '2025-12-25', '09:00:00', '12:00:00', 'Thanh toán trực tiếp', 780000.00, 'final'),
(54, 9, 17, '2025-12-25', '10:00:00', '12:00:00', 'Thanh toán trực tiếp', 300000.00, 'final'),
(55, 9, 17, '2025-12-25', '16:00:00', '18:00:00', 'Thanh toán trực tiếp', 375000.00, 'pending'),
(56, 9, 1, '2025-12-24', '15:30:00', '16:00:00', 'Thanh toán trực tiếp', 60000.00, 'pending'),
(57, 10, 27, '2026-01-01', '15:00:00', '18:00:00', 'Thanh toán trực tiếp', 700000.00, 'final'),
(58, 6, 27, '2025-12-26', '08:00:00', '11:00:00', 'Thanh toán trực tiếp', 600000.00, 'final'),
(59, 6, 27, '2025-12-26', '17:00:00', '20:00:00', 'Thanh toán trực tiếp', 750000.00, 'pending'),
(60, 9, 37, '2025-12-26', '11:00:00', '14:00:00', 'Thanh toán trực tiếp', 840000.00, 'final'),
(61, 9, 37, '2025-12-26', '16:00:00', '19:00:00', 'Thanh toán VNPAY', 1050000.00, 'pending'),
(62, 10, 3, '2025-12-27', '07:00:00', '09:00:00', 'Thanh toán VNPAY', 240000.00, 'pending'),
(64, 3, 3, '2025-12-30', '11:30:00', '13:00:00', 'Thanh toán VNPAY', 180000.00, 'pending'),
(67, 3, 3, '2025-12-31', '12:00:00', '13:00:00', 'Thanh toán VNPAY', 120000.00, 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `courts`
--

CREATE TABLE `courts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `id_areas` int(11) NOT NULL,
  `id_field_types` int(11) NOT NULL,
  `id_users` int(11) DEFAULT NULL,
  `approval_status` varchar(255) DEFAULT 'pending',
  `status` varchar(255) DEFAULT 'active',
  `price` decimal(10,2) DEFAULT 0.00,
  `image` varchar(500) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `courts`
--

INSERT INTO `courts` (`id`, `name`, `id_areas`, `id_field_types`, `id_users`, `approval_status`, `status`, `price`, `image`, `description`) VALUES
(1, 'Sân cầu lông Kiến Trúc', 2, 1, 2, 'approved', 'active', 120000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1762094596345san-cau-long1.jpg?alt=media&token=32e20c80-4355-4cac-8e4a-2c1fd82cd14b', '57 P. Đại An, P. Văn Quán, Hà Đông, Hà Nội'),
(3, 'Sân cầu lông PTIT', 2, 1, 2, 'approved', 'active', 120000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1762094637363san-cau-long1.jpg?alt=media&token=cbab2544-9a05-4ad1-ab53-bf4da68439d1', 'Km10, đường Nguyễn Trãi, P. Mộ Lao, Q. Hà Đông'),
(4, 'Sân cầu lông Dương Nội', 2, 1, 2, 'approved', 'active', 120000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1762094665126san-cau-long1.jpg?alt=media&token=f347db4c-7f3b-46b9-89e7-aa9d948f94ff', ' P. Nguyễn Trác, Yên Nghĩa, Hà Đông, Hà Nội'),
(5, 'Sân cầu lông Tân Triều', 2, 1, 2, 'approved', 'active', 120000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1762094698541san-cau-long1.jpg?alt=media&token=f13f881e-eacc-4adc-9126-e61762fba714', '141 Chiến Thắng, Tân Triều, Hà Đông, Hà Nội'),
(6, 'Triều Khúc Arena', 1, 2, 4, 'approved', 'active', 320000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764519750577timthumb.jpg?alt=media&token=e47945c5-10ee-4aee-8acb-35d165149621', '54 P. Triều Khúc, Thanh Xuân Bắc, Thanh Xuân, Hà Nội'),
(7, 'Sân Pickleball Nhân Chính', 1, 3, 5, 'approved', 'active', 220000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766628233764picklepall.jpg?alt=media&token=052eefce-057d-43dd-aedc-42782688f3c3', '334 Đ. Nguyễn Trãi, Thanh Xuân Trung, Thanh Xuân, Hà Nội'),
(8, 'Sân Bóng Nhân Văn', 1, 2, 5, 'approved', 'active', 280000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764520322820timthumb.jpg?alt=media&token=fe09edef-67ab-431e-9e1f-f35c5a047fab', '336 Đ. Nguyễn Trãi, Thanh Xuân Trung, Thanh Xuân, Hà Nội'),
(9, 'Sân cầu lông Trung Văn', 4, 1, 2, 'approved', 'active', 120000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1762094546721san-cau-long1.jpg?alt=media&token=67a15864-91df-4629-8d7c-3e3a665cf3b1', 'Km9, đường Nguyễn Trãi, P. Trung Văn, Q. Nam Từ Liêm'),
(10, 'Sân bóng đá Thủy Lợi', 3, 2, 2, 'approved', 'active', 150000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764520085992timthumb.jpg?alt=media&token=6e7c3375-5920-4895-82a5-02066a22ce00', '175 Phường Tây Sơn, Đống Đa, TP Hà Nội '),
(11, 'Sân Pickleball Công Đoàn', 3, 3, 2, 'approved', 'active', 100000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766628141804picklepall.jpg?alt=media&token=6083ec53-05f5-4731-8a57-6416819a331a', '176 P. Tây Sơn, Trung Liệt, Đống Đa, Hà Nội '),
(12, 'Trung Văn Yard', 4, 2, 4, 'approved', 'active', 300000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764519741546timthumb.jpg?alt=media&token=4eae46a8-3fc5-44a0-9186-4da5e3f2e64d', 'Km9 Đ. Nguyễn Trãi, P. Văn Quán, Nam Từ Liêm, Hà Nội'),
(13, 'Tân Triều Arena', 2, 2, 4, 'approved', 'active', 200000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764519849185timthumb.jpg?alt=media&token=e9c4642a-8ef4-4e97-8bf5-df4343e78779', '141 Chiến Thắng, Tân Triều, Hà Đông, Hà Nội'),
(14, 'Sân Pickleball Kiến Trúc', 2, 3, 2, 'approved', 'active', 300000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766628148010picklepall.jpg?alt=media&token=f5f23273-c834-4783-b85c-70579a79f481', '57 P. Đại An, P. Văn Quán, Hà Đông, Hà Nội'),
(15, 'Sân Pickleball Đại Mỗ', 4, 3, 4, 'approved', 'active', 100000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766628188629picklepall.jpg?alt=media&token=38de80cc-e925-405c-b43c-32b0ee4c037a', '243 Khuất Duy Tiến, phường Đại Mỗ, TP Hà Nội'),
(17, 'Sân Cầu Lông Triều Khúc', 1, 1, 4, 'approved', 'active', 150000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764597775091caulong.jpg?alt=media&token=b6c16ce6-3027-45fa-8dbe-2720650404a6', 'P. Triều Khúc, Thanh Xuân Bắc, Thanh Xuân, Hà Nội'),
(18, 'Sân Pickleball Triều Khúc', 1, 3, 4, 'approved', 'active', 120000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766628194809picklepall.jpg?alt=media&token=867b4c6f-f604-4923-8e40-873d543263ea', '54 P. Triều Khúc, Thanh Xuân Bắc, Thanh Xuân, Hà Nội'),
(19, 'Sân Pickleball Chiến Thắng', 2, 3, 4, 'approved', 'active', 220000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766628200940picklepall.jpg?alt=media&token=e886de8d-dcbc-4e80-aeeb-0ff6e037a99f', '141 Chiến Thắng, Tân Triều, Thanh Trì, Hà Nội'),
(20, 'Sân bóng Công Đoàn', 3, 2, 2, 'approved', 'active', 250000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764598070975timthumb.jpg?alt=media&token=ec10f76e-533a-4b19-a48f-78f2b7444793', '200 P. Tây Sơn, Trung Liệt, Đống Đa, Hà Nội '),
(21, 'Sân bóng Ngân Hàng', 3, 2, 2, 'approved', 'active', 250000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764598121846timthumb.jpg?alt=media&token=c7155463-d849-4dcd-9898-85a07ababa67', '176 Tây Sơn, Trung Liệt, Đống Đa, Hà Nội '),
(22, 'Sân Cầu Lông Thủy Lợi', 3, 1, 2, 'approved', 'active', 280000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764598167918caulong.jpg?alt=media&token=a19fb7bd-38d1-450b-91b8-54eab1bb8021', '175 P. Tây Sơn, Trung Liệt, Đống Đa, Hà Nội '),
(23, 'Sân Bóng Đại Mỗ', 4, 2, 4, 'approved', 'active', 240000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764600903305timthumb.jpg?alt=media&token=2e0900d2-1117-4ac0-9aef-061ea3a4d2dd', '288 Khuất Duy Tiến, phường Đại Mỗ, TP Hà Nội'),
(24, 'Trung Văn Arena', 4, 2, 4, 'approved', 'active', 210000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764601068779timthumb.jpg?alt=media&token=56398877-e4c1-4701-824b-41326ddf068d', 'Km9 Đ. Nguyễn Trãi, P. Văn Quán, Nam Từ Liêm, Hà Nội'),
(25, 'Sân Pickleball Trung Văn', 4, 3, 4, 'approved', 'active', 280000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766628208087picklepall.jpg?alt=media&token=0338aea0-4462-4d27-8d54-842dcdea3f47', 'Km9 Đ. Nguyễn Trãi, P. Văn Quán, Nam Từ Liêm, Hà Nội'),
(26, 'Sân Cầu Lông Đại Mỗ', 4, 1, 4, 'approved', 'active', 200000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764601249453caulong.jpg?alt=media&token=f9580ffa-a3be-482a-b126-cf45ae6d0cb0', '243 Khuất Duy Tiến, phường Đại Mỗ, TP Hà Nội'),
(27, 'PTIT Yard', 2, 2, 4, 'approved', 'active', 200000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764772780185timthumb.jpg?alt=media&token=49d4687b-2a3e-481c-8a96-6a3303883241', 'Số 310/3, Ngọc Đại, Đại Mỗ, Hà Đông, Hà Nội'),
(28, 'Sân Bóng Rổ Nhân Chính', 1, 5, 5, 'approved', 'active', 250000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766627447815bong%20ro.webp?alt=media&token=cc4e15b3-4cbf-4d53-920d-37eab9f43848', '334 Đ. Nguyễn Trãi, Thanh Xuân Trung, Thanh Xuân, Hà Nội'),
(29, 'Sân bóng rổ Công Nghệ', 5, 5, 2, 'approved', 'active', 300000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766627476534bong%20ro.webp?alt=media&token=cf329b93-2940-4a07-b8ef-e631b2518617', '144 Đ. Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội'),
(30, 'UET Arena', 5, 2, 2, 'approved', 'active', 360000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1765110383051timthumb.jpg?alt=media&token=8cce22fe-d27e-4ffe-804a-18f7821720fe', '144 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội'),
(31, 'Sân bóng rổ ĐHQG', 5, 5, 2, 'approved', 'active', 280000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766627483385bong%20ro.webp?alt=media&token=eb497463-2468-41d4-b674-926a22e98b34', 'Đ. Phạm Văn Đồng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội'),
(32, 'Sân Cầu Lông ĐHQG', 5, 1, 2, 'approved', 'active', 240000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1765110454633caulong.jpg?alt=media&token=c10d2f53-cfe7-4e32-8a5c-1abe3d2dc653', 'Đ. Phạm Văn Đồng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội'),
(33, 'Sân Hàng Đẫy', 3, 2, 2, 'approved', 'active', 2500000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766317327496timthumb.jpg?alt=media&token=beb66632-f537-4e85-971f-7cb07050c0c3', 'Số 9, Trịnh Hoài Đức, Phường Cát Linh, Q. Đống Đa, Hà Nội, Việt Nam'),
(34, 'Sân Pickleball PTIT', 2, 3, 4, 'approved', 'active', 300000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766628219302picklepall.jpg?alt=media&token=085da156-f79f-429d-8924-53b0854a7267', 'Km10 Nguyễn Trãi, P. Mộ Lao, Hà Đông, Hà Nội'),
(35, 'Sân Bóng Rổ PTIT', 2, 5, 4, 'approved', 'active', 260000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766627405622bong%20ro.webp?alt=media&token=fa3dd92c-965c-436f-afcc-530d89d5b024', 'Km10 Nguyễn Trãi, P. Mộ Lao, Hà Đông, Hà Nội'),
(36, 'Sân Cầu Lông Nhân Văn', 1, 1, 5, 'approved', 'active', 340000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766378521457caulong.jpg?alt=media&token=b80cc4b0-e11e-41fe-9c79-72ff14db2358', '338 Đ. Nguyễn Trãi, Thanh Xuân Trung, Thanh Xuân, Hà Nội'),
(37, 'Hạ Đình Yard', 1, 2, 5, 'approved', 'active', 280000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766378756980timthumb.jpg?alt=media&token=04a70bef-d2c6-4259-aa93-9d09f2b54769', 'Ng. 168 Đ. Nguyễn Xiển, Hạ Đình, Thanh Xuân, Hà Nội'),
(38, 'Kim Giang Stadium', 1, 2, 5, 'approved', 'active', 260000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766378889597timthumb.jpg?alt=media&token=f4bfbbe9-6b91-40f6-9c36-fc74e687ae75', 'Số 926 đường bờ sông Kim Giang, P. Thanh Xuân, Hà Nội'),
(39, 'Thượng Đình Arena', 1, 2, 4, 'approved', 'active', 340000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766455218345timthumb.jpg?alt=media&token=b57cc1f5-c5da-4f04-a9e0-f837f8e7e800', '129 Nguyễn Trãi, Thượng Đình, Thanh Xuân, Hà Nội'),
(40, 'Sân Cầu Lông Văn Quán', 2, 1, 4, 'approved', 'active', 290000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766456548704caulong.jpg?alt=media&token=726f107f-51fe-40f6-aa68-16a63c105bcd', '14BT8 khu đô thị Văn Quán, Phường Hà Đông, Thành phố Hà Nội'),
(41, 'Sân bóng rổ Yên Nghĩa ', 2, 5, 4, 'approved', 'active', 200000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766627418355bong%20ro.webp?alt=media&token=cba6ca0b-8bca-40d7-81ac-9a7aa10f4525', 'Số 6, đường Trần Phú, phường Yên Nghĩa, quận Hà Đông, Hà Nội'),
(42, 'Sân bóng Bách Khoa', 7, 2, 4, 'pending', 'active', 360000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766847857299timthumb.jpg?alt=media&token=7813b204-0baf-4525-bd11-99330cfb7398', 'Số 1 Đại Cồ Việt, phường Bạch Mai, Hai Bà Trưng, Thành phố Hà Nội ');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'active',
  `employee_code` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `username`, `email`, `password`, `role`, `status`, `employee_code`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'nhân viên 01', 'nhanvien@gmail.com', '$2b$10$oeSW2OnSpbOlCm/fvWvfVugvaV2AnAD9qpFFAViyZtOiP3cNvdeei', 'isEmployee', 'actived', 'kt01', 2, '2024-05-06 19:26:58', '2025-12-10 11:00:13'),
(2, 'Nguyễn Quang Hải', 'quanghai@gmail.com', '$2b$10$OJmnx1K3bk7qfGZn46FLXOVlhYJUy6crjspT7d/uC4W138f1rohH.', 'isEmployee', 'actived', 'qh01', 5, '2025-12-07 10:30:37', '2025-12-07 10:30:37');

-- --------------------------------------------------------

--
-- Table structure for table `field_types`
--

CREATE TABLE `field_types` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `field_types`
--

INSERT INTO `field_types` (`id`, `type`, `status`) VALUES
(1, 'Sân cầu lông ', 'active'),
(2, 'Sân bóng đá ', 'active'),
(3, 'Sân Pickleball', 'active'),
(5, 'Sân bóng rổ', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `name`, `description`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Khai mạc giải bóng đá PTIT', '<div>Giải bóng đá PTIT</div><div>Địa điểm: Sân PTIT Yard</div><div style=\"font-family: inherit; text-align: start;\">GIẢI BÓNG ĐÁ ITIS CUP 2025</div><div style=\"font-family: inherit; text-align: start;\">Giải bóng đá ITIS CUP là giải bóng thường niên do Liên chi Đoàn khoa CNTT1 tổ chức dành cho toàn thể sinh viên trong khoa CNTT1 với mục đích tạo sân chơi giao lưu, rèn luyện sức khỏe và gắn kết sinh viên trong khoa CNTT1.</div><div style=\"font-family: inherit; text-align: start;\">ITIS CUP 2025 hứa hẹn sẽ mang đến những trận cầu vô cùng bùng nổ và gay cấn. Vậy các bạn còn chần chờ gì nữa mà không nhanh tay lập team đăng ký ngay thôi nào. Sức nóng của ITIS CUP sẽ khiến bạn bớt lạnh và cô đơn trong mùa đông này đó.</div><div style=\"font-family: inherit; text-align: start;\">Thời gian đăng ký tham gia: 30/12/2024 - 13/01/2025.</div><div style=\"font-family: inherit; text-align: start;\">Thời gian dự kiến khai mạc giải bóng: 02/01/2025.</div><div style=\"font-family: inherit; text-align: start;\">Link đăng kí tham gia: <a src=\"/privacy_sandbox/comet/register/source/?xt=AZZ27WtpbtpF_OKj_YtfUJ51QiECH4C8zzNB85GIObOnMHXeV-N9HLLb51ypJuxf-NjSnqy2Lh-bmD3Gz0eCc_bbC4koaQohbjoSJ4gNkYuLS7I2glcL58u2H_Ywu4cHxe3tjqvWd7RV05es6theCnY8MNW4UiJuvMI4Zm6FbQgwCkw7vmEyN4TFhNr-InVoXiOxlSTGQfrgR-GxhVHuZp7Lix6WrBZcUnEPgnWJv5uqf44fNkHRyb2qRnEdZlB4hLPUnF4lFvl1bu2x313ANAeGfLn0IYJakIwwyBlWc82LamEJizsG4VCOwBf6K7zFOgLigN6Z_LDqUGADOSqNtZg5qowyNX4QW9yKOh_IDo7bGQJKskaDhPvCOrre0DAg_txkijD3XqxsP8OaEeqqQNtDZLNJq7Mu3nD39EdVrAwNFdyOGoZ7kjAn-BUAoNlzkq8cJPSJFiHMQ-Vq6IoD-xiT6PZxmsRLX8WNs9cVygtkbIKhLdpBBQ05gZk1Ua4db2PDvRQFUl5iqM2evFVdpiO32eLQNEcGNRgTUwtue2oHxOyW66Bjleq7wHC-B6EszDj9B-lURg8idUmyzaEuPLESo2SiO3t-pqkRSRlyMPxEL-3qFKkbX5IYpiLur32Ms-QrRVUSm1OR26eb1f6amBdtdR86GzWreaSD7Pjp1MHGS4qsqG-sknqGr4r8L7eSu2Ygkx335L3vC-VicNty5Dl9SzpA5tey9hZGtRx6lS1R-Ds23xg3lE_B7XwXkOC0sKFFzAcFPG_yhh_y_H1L6T_hHYjdfQRnlyPIu3qOBZpihFOObJ_7b6ygTxOQQ8PN40jCdX8OehBcdF3UsaERTRqc9_mAfkjrFJWVs0LUpM7ZPUp8FrKqlM7uvcuGvXaXMufvZAftMnUdWE2i7HeRQ9WWqTxQVIYI9kCzLdFOmzB9wJbGUy9MhietJbx3YbJZ6DhIR67MJivrdAMl3GbyC1NMh30bElEQFG3_V_H8NZ5f-8T9xHzfJZKNN4tliDHKsRLguQBT1YXHw2z1mV2ZHD9s4LUEGx6mwG7xiFz2YV_PZuA5j2Q2-TmTEKoqkgIS_Pf9wmVWMcM0sobbwtjtHLtwjht_5hpeZslYRh0i3z6dwH_bKGan3WaexdiJrJHH-2nISRTBso862VIH8etOc2av\" class=\"x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz xkrqix3 x1sur9pj x1fey0fg x1s688f\" href=\"https://forms.gle/GDjm17xR7UpdAuhR8?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExWEpIb0I5czY5eDBIWHdVenNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR5uk0RxnvP0f7RLvV0SR1-tPG-YRzNkOhpAvdwwp6UVkkcGmHRE76HS8xkW3A_aem_Z_3DPjn1NjmqdOn20WgBPA\" rel=\"nofollow\" role=\"link\" tabindex=\"0\" target=\"_blank\" style=\"color: rgb(0, 100, 209); border-inline-width: 0px; margin-inline: 0px; text-align: inherit; border-inline-style: none; padding-inline: 0px; -webkit-tap-highlight-color: transparent; font-weight: 600; list-style-type: none; touch-action: manipulation; display: inline; padding-bottom: 0px; border-top-style: none; border-bottom-style: none; margin-bottom: 0px; margin-top: 0px; padding-top: 0px;\">https://forms.gle/GDjm17xR7UpdAuhR8</a></div><div style=\"font-family: inherit; text-align: start;\">==============================</div><div style=\"font-family: inherit; text-align: start;\">Link Group giải bóng: <a src=\"/privacy_sandbox/comet/register/source/?xt=AZZ27WtpbtpF_OKj_YtfUJ51QiECH4C8zzNB85GIObOnMHXeV-N9HLLb51ypJuxf-NjSnqy2Lh-bmD3Gz0eCc_bbC4koaQohbjoSJ4gNkYuLS7I2glcL58u2H_Ywu4cHxe3tjqvWd7RV05es6theCnY8MNW4UiJuvMI4Zm6FbQgwCkw7vmEyN4TFhNr-InVoXiOxlSTGQfrgR-GxhVHuZp7Lix6WrBZcUnEPgnWJv5uqf44fNkHRyb2qRnEdZlB4hLPUnF4lFvl1bu2x313ANAeGfLn0IYJakIwwyBlWc82LamEJizsG4VCOwBf6K7zFOgLigN6Z_LDqUGADOSqNtZg5qowyNX4QW9yKOh_IDo7bGQJKskaDhPvCOrre0DAg_txkijD3XqxsP8OaEeqqQNtDZLNJq7Mu3nD39EdVrAwNFdyOGoZ7kjAn-BUAoNlzkq8cJPSJFiHMQ-Vq6IoD-xiT6PZxmsRLX8WNs9cVygtkbIKhLdpBBQ05gZk1Ua4db2PDvRQFUl5iqM2evFVdpiO32eLQNEcGNRgTUwtue2oHxOyW66Bjleq7wHC-B6EszDj9B-lURg8idUmyzaEuPLESo2SiO3t-pqkRSRlyMPxEL-3qFKkbX5IYpiLur32Ms-QrRVUSm1OR26eb1f6amBdtdR86GzWreaSD7Pjp1MHGS4qsqG-sknqGr4r8L7eSu2Ygkx335L3vC-VicNty5Dl9SzpA5tey9hZGtRx6lS1R-Ds23xg3lE_B7XwXkOC0sKFFzAcFPG_yhh_y_H1L6T_hHYjdfQRnlyPIu3qOBZpihFOObJ_7b6ygTxOQQ8PN40jCdX8OehBcdF3UsaERTRqc9_mAfkjrFJWVs0LUpM7ZPUp8FrKqlM7uvcuGvXaXMufvZAftMnUdWE2i7HeRQ9WWqTxQVIYI9kCzLdFOmzB9wJbGUy9MhietJbx3YbJZ6DhIR67MJivrdAMl3GbyC1NMh30bElEQFG3_V_H8NZ5f-8T9xHzfJZKNN4tliDHKsRLguQBT1YXHw2z1mV2ZHD9s4LUEGx6mwG7xiFz2YV_PZuA5j2Q2-TmTEKoqkgIS_Pf9wmVWMcM0sobbwtjtHLtwjht_5hpeZslYRh0i3z6dwH_bKGan3WaexdiJrJHH-2nISRTBso862VIH8etOc2av\" class=\"x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz xkrqix3 x1sur9pj x1fey0fg x1s688f\" href=\"https://www.facebook.com/groups/ITISCUPPTIT/?__cft__[0]=AZbwqVLHPo6Z-ivYxN6Grc_CGs2Gmth1iPFpt-ZrfG2YAARtOfCif88OzEcTrkYRe99gNV1hWEfGlj1YxUn1JPOMUVPjraRVfP0RRNMzgZEcVithI2jikUFWwGbRLt_jt3RYrI7qWy0I-Q8gf1enMoCxibmyvpnfKIPlHpWx0JE-jk9DTSsszS3guazxBdlGRW8&amp;__tn__=-UK-R\" role=\"link\" tabindex=\"0\" style=\"color: rgb(0, 100, 209); border-inline-width: 0px; margin-inline: 0px; text-align: inherit; border-inline-style: none; padding-inline: 0px; -webkit-tap-highlight-color: transparent; font-weight: 600; list-style-type: none; touch-action: manipulation; display: inline; padding-bottom: 0px; border-top-style: none; border-bottom-style: none; margin-bottom: 0px; margin-top: 0px; padding-top: 0px;\">https://www.facebook.com/groups/ITISCUPPTIT</a></div><div style=\"font-family: inherit; text-align: start;\">Chúng ta hãy cùng chờ đón nhà Vô địch mùa giải 2024 nhé!</div><div style=\"font-family: inherit; text-align: start;\">=============================================</div><div style=\"font-family: inherit; text-align: start;\">Liên chi Đoàn khoa CNTT1Facebook: <a src=\"/privacy_sandbox/comet/register/source/?xt=AZZ27WtpbtpF_OKj_YtfUJ51QiECH4C8zzNB85GIObOnMHXeV-N9HLLb51ypJuxf-NjSnqy2Lh-bmD3Gz0eCc_bbC4koaQohbjoSJ4gNkYuLS7I2glcL58u2H_Ywu4cHxe3tjqvWd7RV05es6theCnY8MNW4UiJuvMI4Zm6FbQgwCkw7vmEyN4TFhNr-InVoXiOxlSTGQfrgR-GxhVHuZp7Lix6WrBZcUnEPgnWJv5uqf44fNkHRyb2qRnEdZlB4hLPUnF4lFvl1bu2x313ANAeGfLn0IYJakIwwyBlWc82LamEJizsG4VCOwBf6K7zFOgLigN6Z_LDqUGADOSqNtZg5qowyNX4QW9yKOh_IDo7bGQJKskaDhPvCOrre0DAg_txkijD3XqxsP8OaEeqqQNtDZLNJq7Mu3nD39EdVrAwNFdyOGoZ7kjAn-BUAoNlzkq8cJPSJFiHMQ-Vq6IoD-xiT6PZxmsRLX8WNs9cVygtkbIKhLdpBBQ05gZk1Ua4db2PDvRQFUl5iqM2evFVdpiO32eLQNEcGNRgTUwtue2oHxOyW66Bjleq7wHC-B6EszDj9B-lURg8idUmyzaEuPLESo2SiO3t-pqkRSRlyMPxEL-3qFKkbX5IYpiLur32Ms-QrRVUSm1OR26eb1f6amBdtdR86GzWreaSD7Pjp1MHGS4qsqG-sknqGr4r8L7eSu2Ygkx335L3vC-VicNty5Dl9SzpA5tey9hZGtRx6lS1R-Ds23xg3lE_B7XwXkOC0sKFFzAcFPG_yhh_y_H1L6T_hHYjdfQRnlyPIu3qOBZpihFOObJ_7b6ygTxOQQ8PN40jCdX8OehBcdF3UsaERTRqc9_mAfkjrFJWVs0LUpM7ZPUp8FrKqlM7uvcuGvXaXMufvZAftMnUdWE2i7HeRQ9WWqTxQVIYI9kCzLdFOmzB9wJbGUy9MhietJbx3YbJZ6DhIR67MJivrdAMl3GbyC1NMh30bElEQFG3_V_H8NZ5f-8T9xHzfJZKNN4tliDHKsRLguQBT1YXHw2z1mV2ZHD9s4LUEGx6mwG7xiFz2YV_PZuA5j2Q2-TmTEKoqkgIS_Pf9wmVWMcM0sobbwtjtHLtwjht_5hpeZslYRh0i3z6dwH_bKGan3WaexdiJrJHH-2nISRTBso862VIH8etOc2av\" class=\"x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz xkrqix3 x1sur9pj x1fey0fg x1s688f\" href=\"https://www.facebook.com/lcdkhoacntt1.ptit?__cft__[0]=AZbwqVLHPo6Z-ivYxN6Grc_CGs2Gmth1iPFpt-ZrfG2YAARtOfCif88OzEcTrkYRe99gNV1hWEfGlj1YxUn1JPOMUVPjraRVfP0RRNMzgZEcVithI2jikUFWwGbRLt_jt3RYrI7qWy0I-Q8gf1enMoCxibmyvpnfKIPlHpWx0JE-jk9DTSsszS3guazxBdlGRW8&amp;__tn__=-]K-R\" role=\"link\" tabindex=\"0\" style=\"color: rgb(0, 100, 209); border-inline-width: 0px; margin-inline: 0px; text-align: inherit; border-inline-style: none; padding-inline: 0px; -webkit-tap-highlight-color: transparent; font-weight: 600; list-style-type: none; touch-action: manipulation; display: inline; padding-bottom: 0px; border-top-style: none; border-bottom-style: none; margin-bottom: 0px; margin-top: 0px; padding-top: 0px;\">https://www.facebook.com/lcdkhoacntt1.ptit</a></div><div style=\"font-family: inherit; text-align: start;\">Email: bch.cntt.ptit@gmail.com</div><div style=\"font-family: inherit; text-align: start;\">Hotline: 0971.985.235</div><div><br></div>', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766661166323481777244_1145262817395028_2043801106397715280_n.jpg?alt=media&token=b731fbf7-4807-4918-a044-e0fc305510e8', '2024-05-06 17:43:58', '2025-12-25 11:14:56');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `title`, `content`, `created_at`, `updated_at`) VALUES
(1, 'Thông báo 01', 'Thông báo', '2024-03-26 10:13:43', '2024-03-26 10:13:43'),
(2, 'hệ thống giảm giá', 'hệ thống giảm giá', '2024-03-26 11:17:09', '2024-03-26 11:17:09'),
(3, 'hệ thống giảm giá', 'hệ thống giảm giá', '2024-03-26 11:17:58', '2024-03-26 11:17:58'),
(4, 'ptit Email người gửi: huykhalac@gmail.com Họ tên: Tran Huy', 'ptit', '2025-12-02 12:31:39', '2025-12-02 12:31:39'),
(5, 'giảm giá giáng sinh 2025', 'giảm giá giáng sinh 2025', '2025-12-03 15:51:07', '2025-12-03 15:51:07'),
(6, 'ptit Email người gửi: huykhalac@gmail.com Họ tên: Tran Huy', '2025', '2025-12-05 01:58:48', '2025-12-05 01:58:48'),
(7, 'ptit', '2025', '2025-12-05 01:59:30', '2025-12-05 01:59:30'),
(8, 'hỗ trợ đặt sân USSH Email người gửi: HuyTQ.B21CN441@stu.ptit.edu.vn Họ tên: Tran Huy', 'hỗ trợ đặt sân USSH', '2025-12-14 13:26:47', '2025-12-14 13:26:47');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `court_id` int(11) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('pending','approved','final','rejected') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `court_id`, `product_id`, `quantity`, `total_price`, `payment_method`, `created_at`, `status`) VALUES
(3, 12, 4, 1, 2, 40000.00, 'Thanh toán trực tiếp', '2025-12-16 08:09:26', 'pending'),
(4, 12, 4, 3, 1, 290000.00, 'Thanh toán trực tiếp', '2025-12-16 08:10:53', 'pending'),
(5, 12, 4, 4, 1, 5000.00, 'Thanh toán trực tiếp', '2025-12-16 08:12:37', 'final'),
(6, 12, 17, 2, 1, 20000.00, 'Thanh toán trực tiếp', '2025-12-16 08:13:16', 'final'),
(7, 12, 3, 1, 1, 20000.00, 'Thanh toán trực tiếp', '2025-12-16 08:13:35', 'pending'),
(8, 13, 20, 1, 1, 20000.00, 'Thanh toán trực tiếp', '2025-12-16 08:15:09', 'final'),
(9, 13, 4, 5, 1, 40000.00, 'Thanh toán trực tiếp', '2025-12-16 08:57:12', 'final'),
(10, 13, 3, 1, 3, 60000.00, 'Thanh toán trực tiếp', '2025-12-16 08:57:39', 'final'),
(11, 13, 3, 5, 3, 120000.00, 'Thanh toán trực tiếp', '2025-12-16 08:57:43', 'final'),
(12, 13, 9, 5, 1, 40000.00, 'Thanh toán trực tiếp', '2025-12-16 09:54:37', 'final'),
(13, 13, 9, 1, 1, 20000.00, 'Thanh toán trực tiếp', '2025-12-16 09:54:40', 'final'),
(14, 13, 1, 1, 1, 20000.00, 'Thanh toán trực tiếp', '2025-12-16 14:37:43', 'final'),
(15, 13, 1, 5, 1, 40000.00, 'Thanh toán trực tiếp', '2025-12-16 14:37:45', 'pending'),
(16, 13, 27, 4, 1, 5000.00, 'Thanh toán trực tiếp', '2025-12-16 15:12:27', 'final'),
(17, 8, 27, 4, 1, 5000.00, 'Thanh toán trực tiếp', '2025-12-17 08:16:13', 'final'),
(18, 8, 27, 2, 1, 20000.00, 'Thanh toán trực tiếp', '2025-12-17 08:16:15', 'final'),
(19, 8, 1, 1, 1, 20000.00, 'Thanh toán trực tiếp', '2025-12-19 11:21:16', 'pending'),
(20, 8, 1, 5, 8, 320000.00, 'Thanh toán trực tiếp', '2025-12-19 11:21:21', 'final'),
(21, 8, 1, 1, 1, 20000.00, 'Thanh toán trực tiếp', '2025-12-19 13:57:17', 'final'),
(22, 8, 1, 5, 1, 40000.00, 'Thanh toán trực tiếp', '2025-12-19 13:57:19', 'final'),
(23, 9, 4, 5, 1, 40000.00, 'Thanh toán trực tiếp', '2025-12-20 14:03:11', 'final'),
(24, 9, 4, 1, 1, 20000.00, 'Thanh toán trực tiếp', '2025-12-20 14:03:13', 'final'),
(25, 12, 3, 1, 1, 20000.00, 'Thanh toán trực tiếp', '2025-12-21 07:48:15', 'final'),
(26, 13, 33, 5, 1, 40000.00, 'Thanh toán trực tiếp', '2025-12-21 11:46:28', 'final'),
(27, 13, 33, 1, 1, 20000.00, 'Thanh toán trực tiếp', '2025-12-21 11:46:29', 'final'),
(28, 13, 3, 1, 1, 20000.00, 'Thanh toán trực tiếp', '2025-12-22 10:04:45', 'final'),
(29, 13, 6, 4, 1, 5000.00, 'Thanh toán trực tiếp', '2025-12-22 10:04:54', 'final'),
(30, 13, 17, 4, 1, 5000.00, 'Thanh toán trực tiếp', '2025-12-22 10:17:00', 'final'),
(31, 13, 17, 4, 2, 10000.00, 'Thanh toán trực tiếp', '2025-12-22 10:17:07', 'final'),
(32, 13, 17, 7, 1, 10000.00, 'Thanh toán trực tiếp', '2025-12-22 10:17:10', 'final'),
(33, 13, 17, 6, 1, 200000.00, 'Thanh toán trực tiếp', '2025-12-22 10:17:12', 'pending'),
(34, 13, 17, 2, 1, 20000.00, 'Thanh toán trực tiếp', '2025-12-22 10:17:14', 'final'),
(35, 13, 4, 5, 1, 40000.00, 'Thanh toán trực tiếp', '2025-12-23 01:47:08', 'pending'),
(36, 13, 4, 1, 1, 20000.00, 'Thanh toán trực tiếp', '2025-12-23 01:47:10', 'final'),
(37, 12, 6, 8, 1, 60000.00, 'Thanh toán trực tiếp', '2025-12-24 07:47:25', 'final'),
(38, 9, 6, 7, 1, 10000.00, 'Thanh toán trực tiếp', '2025-12-24 11:20:47', 'final'),
(39, 10, 27, 4, 2, 10000.00, 'Thanh toán trực tiếp', '2025-12-24 13:07:41', 'pending'),
(40, 10, 27, 2, 2, 40000.00, 'Thanh toán trực tiếp', '2025-12-24 13:07:46', 'pending'),
(41, 6, 27, 8, 1, 60000.00, 'Thanh toán trực tiếp', '2025-12-25 05:00:24', 'pending'),
(42, 6, 27, 2, 1, 20000.00, 'Thanh toán trực tiếp', '2025-12-25 05:00:26', 'pending'),
(43, 6, 27, 7, 1, 10000.00, 'Thanh toán trực tiếp', '2025-12-25 05:01:52', 'final'),
(44, 10, 11, 1, 1, 20000.00, 'Thanh toán VNPAY', '2025-12-27 14:57:39', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`id`, `user_id`, `token`, `expires_at`, `created_at`) VALUES
(1, 1, '3e261778bcaefe94c837eb4831cc4d804d218da0', '2024-03-26 12:10:23', '2024-03-26 11:10:23');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `status` varchar(255) DEFAULT 'active',
  `item_status` varchar(255) DEFAULT 'new',
  `id_product_type` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `quantity`, `status`, `item_status`, `id_product_type`, `id_user`, `image`) VALUES
(1, 'Nước khoáng', 20000.00, 240, 'active', 'new', 6, 2, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764659151797vinawater-nuoc-la-gi.webp?alt=media&token=58478ac2-bf13-47ae-8bb5-8a2ff03230f6'),
(2, 'Tủ Gửi Đồ', 20000.00, 1200, 'active', 'new', 3, 4, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1765811730566tu-gui-do-sieu-thi-giai-phap-tuyet-voi-cho-khach-hang-2.jpg?alt=media&token=2e5670f0-ff01-43e6-bdf3-32f15329b9fa'),
(3, 'Huấn Luyện Viên', 290000.00, 80, 'active', 'new', 5, 4, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1765816053800201536439-44.jpg?alt=media&token=0ddc718e-ae57-49c1-b937-5a7ae23e9ae3'),
(4, 'Vé Gửi Xe', 5000.00, 2000, 'active', 'new', 3, 4, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1765815813633parking-left-logo-png_seeklogo-281448.png?alt=media&token=8668abf3-4cdc-4918-9855-87bd8556f220'),
(5, 'Áo Thi Đấu', 40000.00, 10000, 'active', 'new', 4, 2, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/176587350290373dfc7ae58220a7bb1fa7269620354bf.jpg?alt=media&token=22ddc2da-9b96-44c2-8cdb-2c0d178e38b4'),
(6, 'Trọng Tài', 200000.00, 1000, 'active', 'new', 5, 4, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/17663031503361439419133-anh-1.jpg?alt=media&token=d33a027e-9795-45fb-933e-15754ac8c782'),
(7, 'Nước Giải Khát', 10000.00, 10000, 'active', 'new', 6, 4, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766307916592vinawater-nuoc-la-gi.webp?alt=media&token=7ba21dd5-b243-4d68-a761-134da9ff1b10'),
(8, 'Áo Tập Luyện', 60000.00, 6000, 'active', 'new', 2, 4, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/176645497834073dfc7ae58220a7bb1fa7269620354bf.jpg?alt=media&token=b299d274-ce24-43d8-87aa-db94024e252f');

-- --------------------------------------------------------

--
-- Table structure for table `product_types`
--

CREATE TABLE `product_types` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `product_types`
--

INSERT INTO `product_types` (`id`, `name`, `status`) VALUES
(2, 'Trang Phục Thể Thao', 'active'),
(3, 'Dịch Vụ Gửi Đồ', 'active'),
(4, 'Dụng Cụ Tập Luyện', 'active'),
(5, 'Dịch Vụ Hậu Cần', 'active'),
(6, 'Đồ Uống', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `residence_rules`
--

CREATE TABLE `residence_rules` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `residence_rules`
--

INSERT INTO `residence_rules` (`id`, `title`, `content`, `created_at`, `updated_at`) VALUES
(2, 'Điều Khoản Sử Dụng', 'Điều khoản sử dụng\n\nChào mừng quý khách hàng đến với Hệ Thống Quản Lý Sân Thể Thao.\n\nChúng tôi là đơn vị quản lý và vận hành hệ thống đặt sân trực tuyến, cung cấp dịch vụ đặt sân thể thao, theo dõi lịch đặt, quản lý thanh toán và hỗ trợ khách hàng. Khi quý khách truy cập và sử dụng website/app của chúng tôi, điều đó đồng nghĩa với việc quý khách đồng ý tuân thủ các Điều khoản sử dụng dưới đây.\n\nChúng tôi có quyền thay đổi, chỉnh sửa, bổ sung hoặc lược bỏ bất kỳ nội dung nào trong Điều khoản này vào bất kỳ thời điểm nào mà không cần thông báo trước. Các thay đổi sẽ có hiệu lực ngay khi được cập nhật lên hệ thống. Khi tiếp tục sử dụng dịch vụ sau khi điều khoản được thay đổi, quý khách được xem như đã đồng ý với các điều chỉnh đó.\nQuý khách vui lòng kiểm tra thường xuyên để cập nhật những thay đổi mới nhất.\n\nHướng dẫn sử dụng hệ thống\n\nKhi truy cập hệ thống, quý khách phải đảm bảo đủ 18 tuổi, hoặc truy cập dưới sự giám sát của cha mẹ hoặc người giám hộ hợp pháp. Quý khách cũng cam kết rằng mình có đầy đủ năng lực hành vi dân sự để thực hiện các giao dịch theo quy định của pháp luật Việt Nam.\n\nChúng tôi sẽ cung cấp cho quý khách một tài khoản (Account) để có thể đặt sân, quản lý lịch chơi và sử dụng các chức năng khác trên hệ thống.\nKhi đăng ký, quý khách phải cung cấp thông tin chính xác, đầy đủ và cập nhật kịp thời khi có thay đổi.\n\nQuý khách hoàn toàn chịu trách nhiệm đối với:\n\nMật khẩu và bảo mật tài khoản.\n\nMọi hoạt động diễn ra thông qua tài khoản của mình.\n\nNếu phát hiện tài khoản bị truy cập trái phép, quý khách phải thông báo ngay cho chúng tôi. Chúng tôi không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh do việc khách hàng không bảo mật tài khoản đúng cách.\n\nNghiêm cấm sử dụng hệ thống nhằm mục đích thương mại trái phép, giả mạo danh tính, hoặc đại diện cho bất kỳ tổ chức, cá nhân nào khi chưa được sự đồng ý bằng văn bản. Nếu vi phạm, chúng tôi có quyền khóa tài khoản mà không cần thông báo trước.\n\nTrong quá trình sử dụng, quý khách đồng ý có thể nhận thông báo hoặc email từ hệ thống (bao gồm thông tin đặt sân, xác nhận thanh toán, khuyến mãi…). Nếu không muốn nhận, quý khách có thể hủy theo hướng dẫn kèm trong từng email.\n\nÝ kiến của khách hàng\n\nMọi phản hồi, ý kiến đóng góp của quý khách về hệ thống đều thuộc quyền quản lý của chúng tôi.\nNếu phát hiện nội dung có tính chất sai sự thật, bôi nhọ, xúc phạm hoặc vi phạm pháp luật, chúng tôi có quyền khóa tài khoản hoặc xử lý theo quy định của pháp luật Việt Nam.', '2025-11-30 16:13:27', '2025-11-30 16:13:27');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id_reviews` int(11) NOT NULL,
  `rating` int(11) NOT NULL CHECK (`rating` between 1 and 5),
  `review_text` text DEFAULT NULL,
  `id_customer` int(11) NOT NULL,
  `id_courts` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id_reviews`, `rating`, `review_text`, `id_customer`, `id_courts`, `created_at`) VALUES
(1, 5, 'Sân đẹp, sạch sẽ, chủ sân thân thiện. Rất hài lòng!', 9, 1, '2025-12-05 13:46:16'),
(2, 4, 'Sân ổn, ánh sáng tốt nhưng phòng tắm hơi nhỏ.', 10, 1, '2025-12-05 13:46:16'),
(3, 2, 'Sân hơi trơn khi trời mưa, cần cải thiện thoát nước.', 12, 1, '2025-12-05 13:46:16'),
(4, 5, 'chất lượng mặt sân và dịch vụ ở đây cực kỳ tốt, giá tiền phù hợp', 9, 1, '2025-12-05 14:47:03'),
(7, 4, 'ai haibara', 3, 1, '2025-12-05 14:55:04'),
(10, 4, 'i love ptit', 3, 5, '2025-12-05 15:10:20'),
(12, 4, 'tạm ổn', 3, 4, '2025-12-05 15:12:14'),
(13, 4, 'chất lượng sân chưa được tốt lắm, nhưng giá thành khá rẻ, dễ tiếp cận với học sinh sinh viên', 3, 4, '2025-12-05 15:14:12'),
(14, 5, 'tôi rất yêu ptit', 3, 3, '2025-12-05 15:15:34'),
(15, 3, 'hello', 3, 1, '2025-12-05 15:34:20'),
(16, 4, 'mê nha', 3, 3, '2025-12-05 16:38:14'),
(25, 4, 'anh em ptit thi đấu cup tại đây rất oke, dịch vụ tốt lắm ', 13, 3, '2025-12-06 09:13:24'),
(26, 4, 'sân hay', 13, 12, '2025-12-07 02:41:50'),
(27, 3, 'sân mới và đẹp', 13, 12, '2025-12-07 02:42:02'),
(28, 4, '8/10', 13, 9, '2025-12-07 10:17:09'),
(30, 4, 'thanh xuân', 13, 8, '2025-12-07 12:15:08'),
(32, 4, 'mex', 13, 4, '2025-12-07 12:40:55'),
(33, 4, 'MÊ NHA', 13, 20, '2025-12-09 04:54:55'),
(34, 4, 'hehe', 13, 15, '2025-12-10 09:59:15'),
(35, 4, 'uet cầu giấy, sân hơi nhỏ nhưng giá cao', 13, 29, '2025-12-10 10:55:54'),
(36, 3, 'trải nghiệm thú vị tại sân', 13, 28, '2025-12-11 05:10:15'),
(37, 5, 'sân có dịch vụ rất tốt', 13, 13, '2025-12-13 10:38:19'),
(38, 4, 'sân này rộng rãi', 13, 20, '2025-12-14 12:48:05'),
(39, 5, 'sân rất đẹp và mới ', 12, 28, '2025-12-14 13:33:17'),
(40, 4, 'sân đẹp và thoáng', 12, 27, '2025-12-15 16:31:05'),
(41, 5, 'oke nha sân đẹp', 12, 17, '2025-12-16 08:13:07'),
(42, 5, 'Sân Cầu Lông PTIT mới và rất đẹp, dịch vụ ổn nha', 13, 3, '2025-12-16 14:40:10'),
(43, 3, 'sân này ở trường giao thông khá mới và sạch sẽ', 13, 18, '2025-12-16 14:55:03'),
(44, 5, 'sân mới và rộng', 13, 32, '2025-12-16 15:02:18'),
(45, 4, 'sân mới và đẹp', 13, 27, '2025-12-16 15:11:50'),
(46, 4, 'SÂN BÓNG CÔNG NGHỆ HIỆN ĐẠI VÀ MỚI', 13, 30, '2025-12-17 07:36:14'),
(50, 4, 'Sân bóng có dịch vụ khá tốt tại Thanh Xuân', 13, 37, '2025-12-22 13:04:55'),
(51, 5, 'sân bóng rộng rãi và dịch vụ ở đây khá ổn', 9, 27, '2025-12-24 09:55:14'),
(52, 5, 'sân bóng có mặt cỏ rất tốt', 9, 12, '2025-12-24 10:14:23'),
(64, 5, 'sân cầu lông khá rộng rãi, dịch vụ đa dạng, giá thành cực kỳ hợp lý với đại đa số người tập', 9, 1, '2025-12-24 12:31:00'),
(67, 5, 'chất lượng, dịch vụ tốt, giá cả khá rẻ nếu so sánh với các sân trong khu vực Hà Đông', 9, 3, '2025-12-24 12:46:56'),
(68, 4, 'thật tuyệt vời khi tập luyện cùng những người bạn tại đây, chất lượng sân và dịch vụ đều ổn, ngoại trừ việc hơi đông vào cuối tuần', 10, 3, '2025-12-24 12:48:49'),
(70, 5, 'mặt cỏ sân khá đẹp, chất lượng dịch vụ ổn, mức giá thuê sân ở mức trung bình so với các sân trong khu vực', 10, 27, '2025-12-24 13:06:20'),
(71, 4, 'sân bóng chất lượng ổn, mặt cỏ siêu đẹp, điểm trừ là giá thành hơi cao', 10, 6, '2025-12-24 13:43:08'),
(72, 5, 'chất lượng sân ở đây rất tốt', 10, 17, '2025-12-25 02:33:48'),
(73, 5, 'sân có chất lượng mặt cỏ và dịch vụ rất tốt', 6, 27, '2025-12-25 05:01:20'),
(74, 4, 'sân bóng nằm ngay ga thanh xuân, giá hơi cao nhưng chất lượng khá tốt', 9, 8, '2025-12-26 12:22:58');

-- --------------------------------------------------------

--
-- Table structure for table `tournaments`
--

CREATE TABLE `tournaments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `info` text DEFAULT NULL,
  `teams` int(11) DEFAULT 0,
  `matches` int(11) DEFAULT 0,
  `group_count` int(11) DEFAULT 0,
  `prizes` int(11) DEFAULT 0,
  `status` varchar(255) DEFAULT 'active',
  `approval_status` varchar(255) DEFAULT 'pending',
  `id_users` int(11) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tournaments`
--

INSERT INTO `tournaments` (`id`, `name`, `info`, `teams`, `matches`, `group_count`, `prizes`, `status`, `approval_status`, `id_users`, `image`) VALUES
(1, 'HAU Nation League', 'HAU Nation League', 4, 3, 4, 10000, 'active', 'approved', 2, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764565547583hau.png?alt=media&token=2a82d670-b896-402e-8b6b-342da74d1db3'),
(3, 'PTIT Cup', 'Cup PTIT', 4, 4, 1, 200000, 'active', 'approved', 5, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764564991067ptit.webp?alt=media&token=6bb54912-cb43-4b46-87b8-0ed168198c49'),
(4, 'Hanu Pickleball Open', 'Hanu Pickleball Open', 8, 8, 1, 200000, 'active', 'pending', 4, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766303197753hanu.png?alt=media&token=055864ad-55df-4915-afd1-d05ff09694bb');

-- --------------------------------------------------------

--
-- Table structure for table `tournament_results`
--

CREATE TABLE `tournament_results` (
  `id` int(11) NOT NULL,
  `tournament_id` int(11) NOT NULL,
  `result_info` text DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tournament_results`
--

INSERT INTO `tournament_results` (`id`, `tournament_id`, `result_info`, `image`) VALUES
(1, 4, 'Champions: D21CN01-HAU ', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764565631385hau.png?alt=media&token=05df2eae-f2e6-4226-9f2f-55863bc2a325');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'noactive',
  `image` varchar(255) DEFAULT 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image_qr` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `phone`, `username`, `password`, `role`, `status`, `image`, `created_at`, `updated_at`, `image_qr`, `age`, `gender`) VALUES
(1, 'admin@gmail.com', '0938283333', 'Admin', '$2b$10$YXMaxfUoSZhXwfjhyku9befvkdgO/UlSvBJ/ypLdMxE3ewMKAN25C', 'isAdmin', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764574849538ptit.png?alt=media&token=3dd3c10f-b891-464b-8f1a-2a6b19f3f004', '2024-03-18 23:44:52', '2025-12-28 03:55:17', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764775306041qr_te.png?alt=media&token=16bc2d7e-a2bc-4545-8ff7-b6e8d4d23a0f', 52, 'other'),
(2, 'seller@gmail.com', '0938283923', 'seller', '$2b$10$8QJCXxuc/WTcyicvKb5KXOFo.iHarOiyb6sQC48ZDUa.PrbvbP0wq', 'isSeller', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1765884603800conan.webp?alt=media&token=a4552837-890d-4698-a847-8e2bc58321ee', '2024-03-19 00:40:14', '2025-12-16 11:30:05', NULL, 74, 'other'),
(3, 'client@gmail.com', '0686886866', 'Ai Haibara', '$2b$10$s/UgWQ5MwNIPRO348h8aF.U9mJW.PGzwYUpq3SgEuxnpENPiNhSxO', 'isClient', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766845406424detective-conan-kurogane-no-submarine-feature-image-e1677646577214.webp?alt=media&token=e52ede3c-697a-491f-b3cf-e5c1539fa94d', '2024-05-12 02:55:53', '2025-12-27 14:23:45', NULL, 16, 'female'),
(4, 'seller2@gmail.com', '0938283923', 'seller', '$2b$10$8QJCXxuc/WTcyicvKb5KXOFo.iHarOiyb6sQC48ZDUa.PrbvbP0wq', 'isSeller', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1765967137193images1.jpg?alt=media&token=d2d5d303-c75c-407e-b6a2-c273a2c207be', '2024-03-19 00:40:14', '2025-12-17 10:25:39', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764899823182qr_te.png?alt=media&token=afd337ee-fd2a-4936-a7ad-8bc238715760', 41, 'male'),
(5, 'banhang1@gmail.com', '0123456789', 'banhang1', '$2b$10$vRBLJ68GZzqC6RARnEJn3eIJmOn2dWrC6hoR2CGFExFRNDxFXRW.y', 'isSeller', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764521372468ptit.png?alt=media&token=2e0ba9eb-02f4-4ddb-8097-b3d5169998c7', '2024-05-19 06:15:38', '2025-12-05 09:15:17', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764521267193qr_te.png?alt=media&token=34f011a5-a164-434c-b5c5-2ff294311e98', 28, 'female'),
(6, 'buyer@gmail.com', '0917333666', 'Kogoro Mouri ', '$2b$10$Yb84dhZPQs5ssnoRqvyAgOFQNesWX4BlZHQUgygU41fSjwYjcd6IK', 'isClient', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766638756297kogoro_mouri_profile.jpg?alt=media&token=501d78fa-4b24-4511-aace-3bd2713245fd', '2025-08-12 10:11:02', '2025-12-25 04:59:21', NULL, 30, 'male'),
(7, 'vuvunghaha@gmail.com', '09144445566', 'test 1', '$2b$10$skRtIeF17.u6y8ayF3P5v.MgzFe76hidvQoQHsnLRb0dMuS6RPNa6', 'isClient', 'actived', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', '2025-08-12 10:22:01', '2025-12-24 13:26:45', NULL, 19, 'male'),
(8, 'huykhalac@gmail.com', '0326456788', 'huyptit', '$2b$10$MzDDmA75xnqcts8RuG6k/uSEIZxiQvUI2pQilIJQnLCMhmE/vOuZm', 'isClient', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764602475028HD-wallpaper-conan-edogawa-cute-detective-conan-male-megane.jpg?alt=media&token=8a40e5b6-3200-4fbe-a28e-894c18e4c839', '2025-11-17 04:46:12', '2025-12-19 00:38:41', NULL, 22, 'male'),
(9, 'huyptit@gmail.com', '0326456788', 'B21DCCN441', '$2b$10$rZcnhIBDJInOluCvbR01..9qPQ4sz7pI6K6x/71/YctI8sTKeIZmK', 'isClient', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/176658030059992586415.jpg?alt=media&token=166ce19e-449f-4c06-b23a-b30ccdb8b75e', '2025-12-01 15:32:46', '2025-12-24 12:45:02', NULL, 21, 'male'),
(10, 'd23ptit@gmail.com', '0123456788', 'Ran Mouri', '$2b$10$EoRcCMVieqrTQH6MvVqoPeLU2/phXGNo0PXV0Nmg4ecyGDK4mQEkC', 'isClient', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766580472261images%20(1).jpg?alt=media&token=6723bc58-4560-4877-bece-1f8051c7e7ee', '2025-12-02 14:11:57', '2025-12-25 02:31:43', NULL, 20, 'female'),
(11, 'seller_hanu@gmail.com', '0123324452', 'seller_hanu', '$2b$10$XnBFBLyYUpZsbP87C600ueYUJ1dKtOJrNaO1pt7aGCGFDCNUGrpCW', 'isSeller', 'actived', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', '2025-12-03 14:43:00', '2025-12-05 09:15:17', NULL, 51, 'female'),
(12, 'kaitokid@gmail.com', '0356658868', 'Kaito Kid', '$2b$10$Okae8oNYd8EpJDB/kXoB2.m2X4hkaeEP/NEW1oNhMU.m/nKNvpsHq', 'isClient', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764931417662kaitokid.png?alt=media&token=d4d42cd3-c0b1-46e9-abd2-20dc0140dbea', '2025-12-05 10:42:45', '2025-12-05 10:47:04', NULL, 19, 'male'),
(13, 'mixi@gmail.com', '0363636363', 'mixi', '$2b$10$cCLvxbwiFAu53nuTi7VRAuDnu4ORpSwJjxh.e.3aTrqCXXj8X7L2O', 'isClient', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1765002032445mixi.jpg?alt=media&token=843afbe4-eaa4-4aa4-953c-6ac2866af30a', '2025-12-06 06:19:32', '2025-12-06 06:20:40', NULL, 36, 'male'),
(14, 'huyd21ptit@gmail.com', '0847656348', 'Takagi', '$2b$10$854q7c6C.1KwKKCBpd5gSeRQS3ivVtg9uckgN864tUORpULmJZ.di', 'isClient', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766809092836miwako-sato-conan.jpg?alt=media&token=76c7f0e6-b606-494a-ad9f-19b81dea2a4c', '2025-12-27 04:15:56', '2025-12-27 13:51:19', NULL, 36, 'female'),
(15, 'huyd22ptit@gmail.com', '0847656348', 'huyd22ptit', '$2b$10$WLnGPGX6JYi6x1G4i53wm..IxcZ0CT0HmdOffWoEJmr2HB/wqIQH.', 'isClient', 'actived', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', '2025-12-27 04:28:33', '2025-12-27 04:29:07', NULL, NULL, NULL),
(16, 'client2@gmail.com', '0123456788', 'client2', '$2b$10$FOcDaQzrIvRKzVUzEyeW8u1rTTeAx6qbbDMzT/LFOn.C5X5v966wi', 'isClient', 'noactive', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', '2025-12-27 14:26:15', '2025-12-27 14:26:15', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `court_id` (`court_id`);

--
-- Indexes for table `courts`
--
ALTER TABLE `courts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_areas` (`id_areas`),
  ADD KEY `id_field_types` (`id_field_types`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `field_types`
--
ALTER TABLE `field_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_product_type` (`id_product_type`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `product_types`
--
ALTER TABLE `product_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `residence_rules`
--
ALTER TABLE `residence_rules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id_reviews`),
  ADD KEY `fk_review_customer` (`id_customer`),
  ADD KEY `fk_review_court` (`id_courts`);

--
-- Indexes for table `tournaments`
--
ALTER TABLE `tournaments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `tournament_results`
--
ALTER TABLE `tournament_results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tournament_id` (`tournament_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `areas`
--
ALTER TABLE `areas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `courts`
--
ALTER TABLE `courts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `field_types`
--
ALTER TABLE `field_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `product_types`
--
ALTER TABLE `product_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `residence_rules`
--
ALTER TABLE `residence_rules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id_reviews` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `tournaments`
--
ALTER TABLE `tournaments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tournament_results`
--
ALTER TABLE `tournament_results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`court_id`) REFERENCES `courts` (`id`);

--
-- Constraints for table `courts`
--
ALTER TABLE `courts`
  ADD CONSTRAINT `courts_ibfk_1` FOREIGN KEY (`id_areas`) REFERENCES `areas` (`id`),
  ADD CONSTRAINT `courts_ibfk_2` FOREIGN KEY (`id_field_types`) REFERENCES `field_types` (`id`),
  ADD CONSTRAINT `courts_ibfk_3` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`);

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD CONSTRAINT `password_reset_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_product_type`) REFERENCES `product_types` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_review_court` FOREIGN KEY (`id_courts`) REFERENCES `courts` (`id`),
  ADD CONSTRAINT `fk_review_customer` FOREIGN KEY (`id_customer`) REFERENCES `users` (`id`);

--
-- Constraints for table `tournaments`
--
ALTER TABLE `tournaments`
  ADD CONSTRAINT `tournaments_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`);

--
-- Constraints for table `tournament_results`
--
ALTER TABLE `tournament_results`
  ADD CONSTRAINT `tournament_results_ibfk_1` FOREIGN KEY (`tournament_id`) REFERENCES `tournaments` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
