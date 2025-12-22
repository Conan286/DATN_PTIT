-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2025 at 12:33 PM
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
(49, 13, 6, '2025-12-30', '09:00:00', '11:00:00', 'Thanh toán trực tiếp', 640000.00, 'pending');

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
(7, 'Sân Pickleball Nhân Chính', 1, 3, 5, 'approved', 'active', 220000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764520284762pick.jpg?alt=media&token=74992205-1adb-41d6-af72-78d5ef3568ed', '334 Đ. Nguyễn Trãi, Thanh Xuân Trung, Thanh Xuân, Hà Nội'),
(8, 'Sân Bóng Nhân Văn', 1, 2, 5, 'approved', 'active', 280000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764520322820timthumb.jpg?alt=media&token=fe09edef-67ab-431e-9e1f-f35c5a047fab', '336 Đ. Nguyễn Trãi, Thanh Xuân Trung, Thanh Xuân, Hà Nội'),
(9, 'Sân cầu lông Trung Văn', 4, 1, 2, 'approved', 'active', 120000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1762094546721san-cau-long1.jpg?alt=media&token=67a15864-91df-4629-8d7c-3e3a665cf3b1', 'Km9, đường Nguyễn Trãi, P. Trung Văn, Q. Nam Từ Liêm'),
(10, 'Sân bóng đá Thủy Lợi', 3, 2, 2, 'approved', 'active', 150000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764520085992timthumb.jpg?alt=media&token=6e7c3375-5920-4895-82a5-02066a22ce00', '175 Phường Tây Sơn, Đống Đa, TP Hà Nội '),
(11, 'Sân Pickleball Công Đoàn', 3, 3, 2, 'approved', 'active', 100000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764520117823pick.jpg?alt=media&token=a850ae8f-4a02-43bd-b31a-e51cdf06eed5', '176 P. Tây Sơn, Trung Liệt, Đống Đa, Hà Nội '),
(12, 'Trung Văn Yard', 4, 2, 4, 'approved', 'active', 300000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764519741546timthumb.jpg?alt=media&token=4eae46a8-3fc5-44a0-9186-4da5e3f2e64d', 'Km9 Đ. Nguyễn Trãi, P. Văn Quán, Nam Từ Liêm, Hà Nội'),
(13, 'Tân Triều Arena', 2, 2, 4, 'approved', 'active', 200000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764519849185timthumb.jpg?alt=media&token=e9c4642a-8ef4-4e97-8bf5-df4343e78779', '141 Chiến Thắng, Tân Triều, Hà Đông, Hà Nội'),
(14, 'Sân Pickleball Kiến Trúc', 2, 3, 2, 'approved', 'active', 300000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764520164434pick.jpg?alt=media&token=b1677e22-b65c-4106-8430-1397a9b08bed', '57 P. Đại An, P. Văn Quán, Hà Đông, Hà Nội'),
(15, 'Sân Pickleball Đại Mỗ', 4, 3, 4, 'approved', 'active', 100000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764565272320pick.jpg?alt=media&token=07a80899-4eef-4a00-8797-0dd8c5582dcd', '243 Khuất Duy Tiến, phường Đại Mỗ, TP Hà Nội'),
(17, 'Sân Cầu Lông Triều Khúc', 1, 1, 4, 'approved', 'active', 150000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764597775091caulong.jpg?alt=media&token=b6c16ce6-3027-45fa-8dbe-2720650404a6', 'P. Triều Khúc, Thanh Xuân Bắc, Thanh Xuân, Hà Nội'),
(18, 'Sân Pickleball Triều Khúc', 1, 3, 4, 'approved', 'active', 120000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764597817616pick.jpg?alt=media&token=037658b3-d08d-4290-b906-638dab38404b', '54 P. Triều Khúc, Thanh Xuân Bắc, Thanh Xuân, Hà Nội'),
(19, 'Sân Pickleball Chiến Thắng', 2, 3, 4, 'approved', 'active', 220000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764597864602pick.jpg?alt=media&token=ea29739e-2e18-40d6-a529-0103f70b4813', '141 Chiến Thắng, Tân Triều, Thanh Trì, Hà Nội'),
(20, 'Sân bóng Công Đoàn', 3, 2, 2, 'approved', 'active', 250000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764598070975timthumb.jpg?alt=media&token=ec10f76e-533a-4b19-a48f-78f2b7444793', '200 P. Tây Sơn, Trung Liệt, Đống Đa, Hà Nội '),
(21, 'Sân bóng Ngân Hàng', 3, 2, 2, 'approved', 'active', 250000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764598121846timthumb.jpg?alt=media&token=c7155463-d849-4dcd-9898-85a07ababa67', '176 Tây Sơn, Trung Liệt, Đống Đa, Hà Nội '),
(22, 'Sân Cầu Lông Thủy Lợi', 3, 1, 2, 'approved', 'active', 280000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764598167918caulong.jpg?alt=media&token=a19fb7bd-38d1-450b-91b8-54eab1bb8021', '175 P. Tây Sơn, Trung Liệt, Đống Đa, Hà Nội '),
(23, 'Sân Bóng Đại Mỗ', 4, 2, 4, 'approved', 'active', 240000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764600903305timthumb.jpg?alt=media&token=2e0900d2-1117-4ac0-9aef-061ea3a4d2dd', '288 Khuất Duy Tiến, phường Đại Mỗ, TP Hà Nội'),
(24, 'Trung Văn Arena', 4, 2, 4, 'approved', 'active', 210000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764601068779timthumb.jpg?alt=media&token=56398877-e4c1-4701-824b-41326ddf068d', 'Km9 Đ. Nguyễn Trãi, P. Văn Quán, Nam Từ Liêm, Hà Nội'),
(25, 'Sân Pickleball Trung Văn', 4, 3, 4, 'approved', 'active', 280000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764601145502pick.jpg?alt=media&token=4d8e23d7-bc73-4666-86c3-a035cf861ede', 'Km9 Đ. Nguyễn Trãi, P. Văn Quán, Nam Từ Liêm, Hà Nội'),
(26, 'Sân Cầu Lông Đại Mỗ', 4, 1, 4, 'approved', 'active', 200000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764601249453caulong.jpg?alt=media&token=f9580ffa-a3be-482a-b126-cf45ae6d0cb0', '243 Khuất Duy Tiến, phường Đại Mỗ, TP Hà Nội'),
(27, 'PTIT Yard', 2, 2, 4, 'approved', 'active', 200000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764772780185timthumb.jpg?alt=media&token=49d4687b-2a3e-481c-8a96-6a3303883241', 'Số 310/3, Ngọc Đại, Đại Mỗ, Hà Đông, Hà Nội'),
(28, 'Sân Bóng Rổ Nhân Chính', 1, 5, 5, 'approved', 'active', 250000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1765103348958sonsanbongro%20(2).jpg?alt=media&token=95d8c914-e793-4fcc-850e-3d94edd1b1c7', '334 Đ. Nguyễn Trãi, Thanh Xuân Trung, Thanh Xuân, Hà Nội'),
(29, 'Sân bóng rổ Công Nghệ', 5, 5, 2, 'approved', 'active', 300000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1765110350306sonsanbongro%20(2).jpg?alt=media&token=34e1c29f-a457-4c5e-882e-9dab7053d8e2', '144 Đ. Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội'),
(30, 'UET Arena', 5, 2, 2, 'approved', 'active', 360000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1765110383051timthumb.jpg?alt=media&token=8cce22fe-d27e-4ffe-804a-18f7821720fe', '144 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội'),
(31, 'Sân bóng rổ ĐHQG', 5, 5, 2, 'approved', 'active', 280000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1765110415651sonsanbongro%20(2).jpg?alt=media&token=e78528e1-ee17-4ed3-ae7c-42f0f6aab60f', 'Đ. Phạm Văn Đồng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội'),
(32, 'Sân Cầu Lông ĐHQG', 5, 1, 2, 'approved', 'active', 240000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1765110454633caulong.jpg?alt=media&token=c10d2f53-cfe7-4e32-8a5c-1abe3d2dc653', 'Đ. Phạm Văn Đồng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội'),
(33, 'Sân Hàng Đẫy', 3, 2, 2, 'approved', 'active', 2500000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766317327496timthumb.jpg?alt=media&token=beb66632-f537-4e85-971f-7cb07050c0c3', 'Số 9, Trịnh Hoài Đức, Phường Cát Linh, Q. Đống Đa, Hà Nội, Việt Nam'),
(34, 'Sân Pickleball PTIT', 2, 3, 4, 'approved', 'active', 300000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766377653005pick.jpg?alt=media&token=3ab59d43-95dc-4db9-9fa3-4055ae49d8e2', 'Km10 Nguyễn Trãi, P. Mộ Lao, Hà Đông, Hà Nội'),
(35, 'Sân Bóng Rổ PTIT', 2, 5, 4, 'approved', 'active', 260000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766377755110sonsanbongro%20(2).jpg?alt=media&token=1050525a-9912-479a-8090-930ca32e249a', 'Km10 Nguyễn Trãi, P. Mộ Lao, Hà Đông, Hà Nội'),
(36, 'Sân Cầu Lông Nhân Văn', 1, 1, 5, 'approved', 'active', 340000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766378521457caulong.jpg?alt=media&token=b80cc4b0-e11e-41fe-9c79-72ff14db2358', '338 Đ. Nguyễn Trãi, Thanh Xuân Trung, Thanh Xuân, Hà Nội'),
(37, 'Hạ Đình Yard', 1, 2, 5, 'approved', 'active', 280000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766378756980timthumb.jpg?alt=media&token=04a70bef-d2c6-4259-aa93-9d09f2b54769', 'Ng. 168 Đ. Nguyễn Xiển, Hạ Đình, Thanh Xuân, Hà Nội'),
(38, 'Kim Giang Stadium', 1, 2, 5, 'approved', 'active', 260000.00, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766378889597timthumb.jpg?alt=media&token=f4bfbbe9-6b91-40f6-9c36-fc74e687ae75', 'Số 926 đường bờ sông Kim Giang, P. Thanh Xuân, Hà Nội');

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
(1, 'Khai mạc giải bóng đá PTIT', '<div>Giải bóng đá PTIT</div>', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766377929448ptit.png?alt=media&token=71a21098-b8f3-4db3-8ebf-c086adb87298', '2024-05-06 17:43:58', '2025-12-22 04:32:12');

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
(6, 12, 17, 2, 1, 20000.00, 'Thanh toán trực tiếp', '2025-12-16 08:13:16', 'pending'),
(7, 12, 3, 1, 1, 20000.00, 'Thanh toán trực tiếp', '2025-12-16 08:13:35', 'pending'),
(8, 13, 20, 1, 1, 20000.00, 'Thanh toán trực tiếp', '2025-12-16 08:15:09', 'final'),
(9, 13, 4, 5, 1, 40000.00, 'Thanh toán trực tiếp', '2025-12-16 08:57:12', 'pending'),
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
(32, 13, 17, 7, 1, 10000.00, 'Thanh toán trực tiếp', '2025-12-22 10:17:10', 'pending'),
(33, 13, 17, 6, 1, 200000.00, 'Thanh toán trực tiếp', '2025-12-22 10:17:12', 'pending'),
(34, 13, 17, 2, 1, 20000.00, 'Thanh toán trực tiếp', '2025-12-22 10:17:14', 'pending');

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
(7, 'Nước Suối', 10000.00, 10000, 'active', 'new', 6, 4, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766307916592vinawater-nuoc-la-gi.webp?alt=media&token=7ba21dd5-b243-4d68-a761-134da9ff1b10');

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
(4, 4, 'hehe', 9, 1, '2025-12-05 14:47:03'),
(5, 3, 'hay', 9, 1, '2025-12-05 14:51:13'),
(6, 2, 'ptit ptit ptit', 9, 1, '2025-12-05 14:53:19'),
(7, 4, 'ai haibara', 3, 1, '2025-12-05 14:55:04'),
(8, 4, 'd23 ptit diểm danh', 3, 3, '2025-12-05 14:55:45'),
(10, 4, 'i love ptit', 3, 5, '2025-12-05 15:10:20'),
(12, 4, 'pka', 3, 4, '2025-12-05 15:12:14'),
(13, 3, 'he', 3, 4, '2025-12-05 15:14:12'),
(14, 5, 'tôi rất yêu ptit', 3, 3, '2025-12-05 15:15:34'),
(15, 3, 'hello', 3, 1, '2025-12-05 15:34:20'),
(16, 4, 'mê nha', 3, 3, '2025-12-05 16:38:14'),
(25, 4, 'anh em ptit thi đấu cup tại đây hí hí', 13, 3, '2025-12-06 09:13:24'),
(26, 4, 'sân hay', 13, 12, '2025-12-07 02:41:50'),
(27, 3, 'sân mới và đẹp', 13, 12, '2025-12-07 02:42:02'),
(28, 4, '8/10', 13, 9, '2025-12-07 10:17:09'),
(29, 4, 'PTIT WITH LOVE', 13, 3, '2025-12-07 10:18:07'),
(30, 4, 'thanh xuân', 13, 8, '2025-12-07 12:15:08'),
(31, 3, 'hehe', 13, 3, '2025-12-07 12:40:34'),
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
(47, 4, 'ptit', 8, 3, '2025-12-19 00:37:53'),
(49, 5, 'Sân vận động bao gồm 4 khán đài, được xây dựng theo hình lòng chảo có 20 bậc chứa', 13, 33, '2025-12-21 11:46:18');

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
(4, 'Hanu Pickleball Open', 'Hanu Pickleball Open', 8, 8, 1, 200000, 'active', 'approved', 4, 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1766303197753hanu.png?alt=media&token=055864ad-55df-4915-afd1-d05ff09694bb');

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
(1, 'admin@gmail.com', '0938283333', 'Admin', '$2b$10$YXMaxfUoSZhXwfjhyku9befvkdgO/UlSvBJ/ypLdMxE3ewMKAN25C', 'isAdmin', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764574849538ptit.png?alt=media&token=3dd3c10f-b891-464b-8f1a-2a6b19f3f004', '2024-03-18 23:44:52', '2025-12-05 09:15:17', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764775306041qr_te.png?alt=media&token=16bc2d7e-a2bc-4545-8ff7-b6e8d4d23a0f', 52, 'other'),
(2, 'seller@gmail.com', '0938283923', 'seller', '$2b$10$8QJCXxuc/WTcyicvKb5KXOFo.iHarOiyb6sQC48ZDUa.PrbvbP0wq', 'isSeller', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1765884603800conan.webp?alt=media&token=a4552837-890d-4698-a847-8e2bc58321ee', '2024-03-19 00:40:14', '2025-12-16 11:30:05', NULL, 74, 'other'),
(3, 'client@gmail.com', '0686886866', 'Sherry', '$2b$10$s/UgWQ5MwNIPRO348h8aF.U9mJW.PGzwYUpq3SgEuxnpENPiNhSxO', 'isClient', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764931221085images1.jpg?alt=media&token=e041bd64-d4d5-40a5-87e8-102357be8a49', '2024-05-12 02:55:53', '2025-12-05 10:40:45', NULL, 16, 'female'),
(4, 'seller2@gmail.com', '0938283923', 'seller', '$2b$10$8QJCXxuc/WTcyicvKb5KXOFo.iHarOiyb6sQC48ZDUa.PrbvbP0wq', 'isSeller', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1765967137193images1.jpg?alt=media&token=d2d5d303-c75c-407e-b6a2-c273a2c207be', '2024-03-19 00:40:14', '2025-12-17 10:25:39', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764899823182qr_te.png?alt=media&token=afd337ee-fd2a-4936-a7ad-8bc238715760', 41, 'male'),
(5, 'banhang1@gmail.com', '0123456789', 'banhang1', '$2b$10$vRBLJ68GZzqC6RARnEJn3eIJmOn2dWrC6hoR2CGFExFRNDxFXRW.y', 'isSeller', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764521372468ptit.png?alt=media&token=2e0ba9eb-02f4-4ddb-8097-b3d5169998c7', '2024-05-19 06:15:38', '2025-12-05 09:15:17', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764521267193qr_te.png?alt=media&token=34f011a5-a164-434c-b5c5-2ff294311e98', 28, 'female'),
(6, 'buyer@gmail.com', '0917333666', 'seller', '$2b$10$Yb84dhZPQs5ssnoRqvyAgOFQNesWX4BlZHQUgygU41fSjwYjcd6IK', 'isClient', 'actived', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', '2025-08-12 10:11:02', '2025-12-05 09:15:17', NULL, 30, 'male'),
(7, 'vuvunghaha@gmail.com', '09144445566', 'test 1', '$2b$10$skRtIeF17.u6y8ayF3P5v.MgzFe76hidvQoQHsnLRb0dMuS6RPNa6', 'isClient', 'actived', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', '2025-08-12 10:22:01', '2025-12-05 09:15:17', NULL, 19, 'male'),
(8, 'huykhalac@gmail.com', '0326456788', 'huyptit', '$2b$10$MzDDmA75xnqcts8RuG6k/uSEIZxiQvUI2pQilIJQnLCMhmE/vOuZm', 'isClient', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764602475028HD-wallpaper-conan-edogawa-cute-detective-conan-male-megane.jpg?alt=media&token=8a40e5b6-3200-4fbe-a28e-894c18e4c839', '2025-11-17 04:46:12', '2025-12-19 00:38:41', NULL, 22, 'male'),
(9, 'huyptit@gmail.com', '0326456788', 'B21DCCN441', '$2b$10$rZcnhIBDJInOluCvbR01..9qPQ4sz7pI6K6x/71/YctI8sTKeIZmK', 'isClient', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764937786624conan.webp?alt=media&token=1f723d52-bddb-4ad0-867d-415834b096e2', '2025-12-01 15:32:46', '2025-12-20 14:01:59', NULL, 21, 'male'),
(10, 'd23ptit@gmail.com', '0123456788', 'd23ptit', '$2b$10$EoRcCMVieqrTQH6MvVqoPeLU2/phXGNo0PXV0Nmg4ecyGDK4mQEkC', 'isClient', 'actived', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', '2025-12-02 14:11:57', '2025-12-05 09:15:17', NULL, 10, 'male'),
(11, 'seller_hanu@gmail.com', '0123324452', 'seller_hanu', '$2b$10$XnBFBLyYUpZsbP87C600ueYUJ1dKtOJrNaO1pt7aGCGFDCNUGrpCW', 'isSeller', 'actived', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', '2025-12-03 14:43:00', '2025-12-05 09:15:17', NULL, 51, 'female'),
(12, 'kaitokid@gmail.com', '0356658868', 'Kaito Kid', '$2b$10$Okae8oNYd8EpJDB/kXoB2.m2X4hkaeEP/NEW1oNhMU.m/nKNvpsHq', 'isClient', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1764931417662kaitokid.png?alt=media&token=d4d42cd3-c0b1-46e9-abd2-20dc0140dbea', '2025-12-05 10:42:45', '2025-12-05 10:47:04', NULL, 19, 'male'),
(13, 'mixi@gmail.com', '0363636363', 'mixi', '$2b$10$cCLvxbwiFAu53nuTi7VRAuDnu4ORpSwJjxh.e.3aTrqCXXj8X7L2O', 'isClient', 'actived', 'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1765002032445mixi.jpg?alt=media&token=843afbe4-eaa4-4aa4-953c-6ac2866af30a', '2025-12-06 06:19:32', '2025-12-06 06:20:40', NULL, 36, 'male');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `courts`
--
ALTER TABLE `courts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `product_types`
--
ALTER TABLE `product_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `residence_rules`
--
ALTER TABLE `residence_rules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id_reviews` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
