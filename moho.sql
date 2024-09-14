-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th9 14, 2024 lúc 05:05 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `moho`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `address_order`
--

CREATE TABLE `address_order` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL DEFAULT '',
  `city` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `ward` varchar(255) NOT NULL,
  `detailed_address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `address_order`
--

INSERT INTO `address_order` (`id`, `user_id`, `name`, `phone`, `city`, `district`, `ward`, `detailed_address`) VALUES
(34, 10, 'Thức', '0975801610', 'Tỉnh Hà Giang', 'Thành phố Hà Giang', 'Phường Trần Phú', 'B7/18Z, ấp 2A');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_items`
--

CREATE TABLE `cart_items` (
  `cart_item_id` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `cart_items`
--

INSERT INTO `cart_items` (`cart_item_id`, `id_product`, `user_id`, `quantity`) VALUES
(119, 78, 10, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaisp`
--

CREATE TABLE `loaisp` (
  `id_loaisanpham` int(11) NOT NULL,
  `ten_loaisp` varchar(255) NOT NULL,
  `banner` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `loaisp`
--

INSERT INTO `loaisp` (`id_loaisanpham`, `ten_loaisp`, `banner`) VALUES
(12, 'SoFa', '1725671301186_sofa.jpg'),
(13, 'ArmChair', '1725671371513_banner-armchair-nha-xinh.jpg'),
(14, 'Bàn ăn', '1725671421558_banan.jpg'),
(15, 'Giường', '1725671501067_phong-ngu-hien-dai-thanh-lich-skagen-13522.jpg'),
(16, 'Ghế ăn', '1725671539470_bo-suu-tap-elegance-ban-an.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `oder`
--

CREATE TABLE `oder` (
  `id_order` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_date` date NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `paymentMethod` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `oder`
--

INSERT INTO `oder` (`id_order`, `address_id`, `user_id`, `order_date`, `total_price`, `paymentMethod`) VALUES
(31, 34, 10, '0000-00-00', 20650000.00, 'MOMO');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order_detail`
--

INSERT INTO `order_detail` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(20, 31, 78, 5, 20650000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

CREATE TABLE `sanpham` (
  `id` int(11) NOT NULL,
  `ten_sanpham` varchar(255) NOT NULL,
  `mo_ta` text NOT NULL,
  `gia` int(11) NOT NULL,
  `id_loaisanpham` int(11) NOT NULL,
  `anh` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`id`, `ten_sanpham`, `mo_ta`, `gia`, `id_loaisanpham`, `anh`) VALUES
(77, 'Ghế ăn Bolero ACC001 Da AB1142', '<p><strong style=\"color: rgb(10, 10, 11);\">Vật liệu</strong></p><p>Chân inox màu gold - Bọc da bò cao cấp</p><p><strong style=\"color: rgb(10, 10, 11);\">Kích thước</strong></p><p>D470 - R570 - C860 mm</p><p>Hàng có sẵn -&nbsp;<strong style=\"color: rgb(10, 10, 11);\">Xem cửa hàng trưng bày</strong></p><p><br></p><p>Mã:&nbsp;3*113004</p><p><strong>Danh mục</strong>:&nbsp;<a href=\"https://nhaxinh.com/danh-muc/phong-an/ghe-an/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(10, 10, 11);\">Ghế ăn</a>,&nbsp;<a href=\"https://nhaxinh.com/danh-muc/phong-an/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(10, 10, 11);\">Phòng ăn</a></p>', 5520000, 16, '1725671600152_image_2024-09-07_081315290.png'),
(78, 'Ghế ăn có tay Ogami vải vact10499', '<h3><strong style=\"color: rgb(10, 10, 11);\">Vật liệu</strong></h3><p>Gỗ Beech tự nhiên bọc vải cao cấp</p><h3><strong style=\"color: rgb(10, 10, 11);\">Kích thước</strong></h3><p>D580 - R575 - C785 mm</p><p>Hàng có sẵn -&nbsp;<strong style=\"color: rgb(10, 10, 11);\">Xem cửa hàng trưng bày</strong></p><h3><br></h3><p>Mã:&nbsp;3*113634</p><p><strong>Danh mục</strong>:&nbsp;<a href=\"https://nhaxinh.com/danh-muc/phong-an/ghe-an/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(10, 10, 11);\">Ghế ăn</a>,&nbsp;<a href=\"https://nhaxinh.com/danh-muc/phong-an/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(10, 10, 11);\">Phòng ăn</a></p>', 4130000, 16, '1725671738978_image_2024-09-07_081538074.png'),
(79, 'Ghế ăn Coastal KD1085-18', '<h3><strong style=\"color: rgb(10, 10, 11);\">Vật liệu</strong></h3><p>Gỗ Ash - nệm bọc vải</p><h3><strong style=\"color: rgb(10, 10, 11);\">Kích thước</strong></h3><p>D435 - R525 - C840 mm</p><p>Hàng có sẵn -&nbsp;<strong style=\"color: rgb(10, 10, 11);\">Xem cửa hàng trưng bày</strong></p><p><br></p><p>Mã:&nbsp;3*111271</p><p>Danh mục:&nbsp;<a href=\"https://nhaxinh.com/danh-muc/bep/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(10, 10, 11);\">Bếp</a>,&nbsp;<a href=\"https://nhaxinh.com/danh-muc/phong-an/ghe-an/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(10, 10, 11);\">Ghế ăn</a>,&nbsp;<a href=\"https://nhaxinh.com/danh-muc/phong-an/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(10, 10, 11);\">Phòng ăn</a></p>', 4300000, 16, '1725671796574_image_2024-09-07_081635787.png'),
(80, 'Ghế ăn có tay Valente', '<h3><strong style=\"color: rgb(10, 10, 11);\">Vật liệu</strong></h3><p>Lưng ghế Plywood veneer Oak - da mushroom - Chân inox mạ PVD</p><h3><strong style=\"color: rgb(10, 10, 11);\">Kích thước</strong></h3><p>D500 - R550 - C850 mm</p><p>Hàng có sẵn -&nbsp;<strong style=\"color: rgb(10, 10, 11);\">Xem cửa hàng trưng bày</strong></p><p><br></p><p>Mã:&nbsp;3*113475</p><p>Danh mục:&nbsp;<a href=\"https://nhaxinh.com/danh-muc/phong-an/ghe-an/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(10, 10, 11);\">Ghế ăn</a>,&nbsp;<a href=\"https://nhaxinh.com/danh-muc/phong-an/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(10, 10, 11);\">Phòng ăn</a></p>', 5100000, 16, '1725671892424_image_2024-09-07_081811546.png'),
(81, ' preview next Sofa 2 chỗ', '<h3><span style=\"color: rgb(10, 10, 11);\">Kích thước</span></h3><p>D1800 - R840 - C800 mm</p><h3><span style=\"color: rgb(10, 10, 11);\">Vật liệu</span></h3><p>(Giá không bao gồm gối trang trí)&nbsp;Gỗ Beech bọc vải nhập khẩu cao cấp</p><p>Hàng có sẵn -&nbsp;<strong style=\"color: rgb(10, 10, 11);\">Xem cửa hàng trưng bày</strong></p><p><br></p><p>Mã:&nbsp;3*113926</p><p>Danh mục:&nbsp;<a href=\"https://nhaxinh.com/danh-muc/phong-khach/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(10, 10, 11);\">Phòng khách</a>,&nbsp;<a href=\"https://nhaxinh.com/danh-muc/phong-khach/sofa/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(10, 10, 11);\">Sofa</a></p>', 13515000, 12, '1725672043910_image_2024-09-07_082042717.png'),
(82, 'Sofa 2 chỗ Mây mới', '<h3><strong style=\"color: rgb(10, 10, 11);\">Kích thước</strong></h3><p>D1690 - R760 - C700 mm</p><h3><strong style=\"color: rgb(10, 10, 11);\">Vật liệu</strong></h3><p>Gỗ beech tự nhiên - Nệm bọc vải nhập khẩu cao cấp - Mây tự nhiên màu trắng gồm 5 gối trang trí</p><p>Hàng có sẵn -&nbsp;<strong style=\"color: rgb(10, 10, 11);\">Xem cửa hàng trưng bày</strong></p><p><br></p><p>Mã:&nbsp;3*113345</p><p>Danh mục:&nbsp;<a href=\"https://nhaxinh.com/danh-muc/phong-khach/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(10, 10, 11);\">Phòng khách</a>,&nbsp;<a href=\"https://nhaxinh.com/danh-muc/phong-khach/sofa/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(10, 10, 11);\">Sofa</a></p>', 16915000, 12, '1725672305532_image_2024-09-07_082504714.png'),
(83, 'Armchair Mây mới', '<h3><strong style=\"color: rgb(10, 10, 11);\">Kích thước</strong></h3><p>D670 - R760 - C700 mm</p><h3><strong style=\"color: rgb(10, 10, 11);\">Vật liệu</strong></h3><p>Gỗ Beech tự nhiên - Nệm bọc vải nhập khẩu cao cấp - Mây tự nhiên màu trắng, bao gồm 1 gối trang trí</p><p><br></p><p>Hàng có sẵn -&nbsp;<strong style=\"color: rgb(10, 10, 11);\">Xem cửa hàng trưng bày</strong></p><p><br></p><p>Mã:&nbsp;3*113344</p><p>Danh mục:&nbsp;<a href=\"https://nhaxinh.com/danh-muc/phong-khach/armchair/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(10, 10, 11);\">Armchair</a>,&nbsp;<a href=\"https://nhaxinh.com/danh-muc/phong-khach/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(10, 10, 11);\">Phòng khách</a></p>', 11815000, 13, '1725673684366_image_2024-09-07_084803347.png'),
(84, 'Giường Coastal', '<h3><strong style=\"color: rgb(10, 10, 11);\">Vật liệu</strong></h3><p>Khung gỗ Ash - nệm bọc vải</p><h3><strong style=\"color: rgb(10, 10, 11);\">Kích thước</strong></h3><p>D2000 - R1800 - C1080 mm</p><p>Mã:&nbsp;3*111277</p><p>Danh mục:&nbsp;<a href=\"https://nhaxinh.com/danh-muc/phong-ngu/giuong/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(10, 10, 11);\">Giường</a>,&nbsp;<a href=\"https://nhaxinh.com/danh-muc/phong-ngu/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(10, 10, 11);\">Phòng ngủ</a></p>', 25000000, 15, '1725673760508_image_2024-09-07_084919599.png'),
(85, 'Bàn ăn 8 chỗ', '<h3><strong style=\"color: rgb(10, 10, 11);\">Vật liệu</strong></h3><p>Chân kim loại sơn hiệu ứng, mặt đá</p><h3><strong style=\"color: rgb(10, 10, 11);\">Kích thước</strong></h3><p>D2250 - R950 - C750 mm</p><p>Hàng có sẵn -&nbsp;<strong style=\"color: rgb(10, 10, 11);\">Xem cửa hàng trưng bày</strong></p><p><br></p><p>Mã:&nbsp;3*112668</p><p>Danh mục:&nbsp;<a href=\"https://nhaxinh.com/danh-muc/phong-an/ban-an/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(10, 10, 11);\">Bàn ăn</a>,&nbsp;<a href=\"https://nhaxinh.com/danh-muc/phong-an/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(10, 10, 11);\">Phòng ăn</a></p>', 5000000, 14, '1725674639555_image_2024-09-07_090358817.png');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `slider`
--

CREATE TABLE `slider` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `order` int(11) NOT NULL,
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `email`, `name`, `password`, `role_id`) VALUES
(10, 'sieunhangao0985@gmail.com', 'Thức', '$2b$10$cIWW74zkk37fyFF9X13THu/zUZ6C9NtgQFcXq/MMxvfEQxa1L1M/K', 1),
(11, 'ngan123@gmail.com', 'Ngân', '$2b$10$39UWNY9tmuNXgn3tnGeC4OuAmJuCuy6.xmElMkrIPA4RK.ejOUEVK', 2);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `address_order`
--
ALTER TABLE `address_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`cart_item_id`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `loaisp`
--
ALTER TABLE `loaisp`
  ADD PRIMARY KEY (`id_loaisanpham`);

--
-- Chỉ mục cho bảng `oder`
--
ALTER TABLE `oder`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `address_id` (`address_id`);

--
-- Chỉ mục cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_loaisanpham` (`id_loaisanpham`);

--
-- Chỉ mục cho bảng `slider`
--
ALTER TABLE `slider`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `address_order`
--
ALTER TABLE `address_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `cart_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT cho bảng `loaisp`
--
ALTER TABLE `loaisp`
  MODIFY `id_loaisanpham` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `oder`
--
ALTER TABLE `oder`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT cho bảng `slider`
--
ALTER TABLE `slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `address_order`
--
ALTER TABLE `address_order`
  ADD CONSTRAINT `address_order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `sanpham` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `oder`
--
ALTER TABLE `oder`
  ADD CONSTRAINT `oder_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `oder_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `address_order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `oder` (`id_order`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `sanpham` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`id_loaisanpham`) REFERENCES `loaisp` (`id_loaisanpham`);

--
-- Các ràng buộc cho bảng `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
