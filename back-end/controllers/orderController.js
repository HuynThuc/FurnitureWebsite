const db = require('../config/db');

// Hàm tạo đơn hàng và chi tiết đơn hàng
const createOrder = (req, res) => {
    const { userId, addressId, paymentMethod } = req.body; // Nhận paymentMethod từ frontend

    // Lấy thông tin giỏ hàng và tổng giá
    const sql = `
        SELECT cart_items.cart_item_id, cart_items.quantity, cart_items.id_product, sanpham.gia,
               (cart_items.quantity * sanpham.gia) AS item_total,
               (SELECT SUM(cart_items.quantity * sanpham.gia)
                FROM cart_items
                JOIN sanpham ON cart_items.id_product = sanpham.id
                WHERE cart_items.user_id = ?) AS total
        FROM cart_items
        JOIN sanpham ON cart_items.id_product = sanpham.id
        WHERE cart_items.user_id = ?`;

    db.query(sql, [userId, userId], (err, cartItems) => {
        if (err) {
            console.error('Error fetching cart items:', err);
            return res.status(500).json({ message: 'Có lỗi xảy ra khi lấy sản phẩm từ giỏ hàng.' });
        }

        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Giỏ hàng trống.' });
        }

        const total = cartItems[0].total;

        // Tạo đơn hàng mới với phương thức thanh toán
        db.query(
            'INSERT INTO `oder` (`address_id`, `user_id`, `total_price`, `paymentMethod`,  `status`) VALUES (?, ?, ?, ?, ?)',
            [addressId, userId, total, paymentMethod, 'Đang xử lý'], // Lưu tổng giá và phương thức thanh toán
            (err, orderResult) => {
                if (err) {
                    console.error('Error creating order:', err);
                    return res.status(500).json({ message: 'Có lỗi xảy ra khi tạo đơn hàng.' });
                }

                const orderId = orderResult.insertId;

                // Thêm chi tiết đơn hàng từ giỏ hàng
                const orderDetailsQueries = cartItems.map(item => {
                    return {
                        query: 'INSERT INTO `order_detail` (`order_id`, `product_id`, `quantity`, `price`) VALUES (?, ?, ?, ?)',
                        params: [orderId, item.id_product, item.quantity, item.item_total]
                    };
                });

                let queriesCompleted = 0;
                orderDetailsQueries.forEach(({ query, params }) => {
                    db.query(query, params, (err) => {
                        if (err) {
                            console.error('Error inserting order detail:', err);
                            return res.status(500).json({ message: 'Có lỗi xảy ra khi thêm chi tiết đơn hàng.' });
                        }

                        queriesCompleted++;
                        if (queriesCompleted === orderDetailsQueries.length) {
                            // Xóa giỏ hàng sau khi đặt hàng thành công
                            db.query(
                                'DELETE FROM `cart_items` WHERE `user_id` = ?',
                                [userId],
                                (err) => {
                                    if (err) {
                                        console.error('Error deleting cart items:', err);
                                        return res.status(500).json({ message: 'Có lỗi xảy ra khi xóa sản phẩm trong giỏ hàng.' });
                                    }

                                    res.status(201).json({ message: 'Đơn hàng đã được tạo thành công.' });
                                }
                            );
                        }
                    });
                });
            }
        );
    });
};

//Lấy thông tin đơn hàng 
const getOrder = (req, res) => {
    const sql = `SELECT oder.id_order, oder.status, oder.createdAt, oder.total_price, oder.paymentMethod, user.name, address_order.*
FROM oder
JOIN user ON oder.user_id = user.id
JOIN address_order ON oder.address_id = address_order.id`;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.json(results);
    });
}

const updateOrderStatus = (req, res) => {
    const { id } = req.params;
    const {status} = req.body; // Nhận orderId và newStatus từ frontend

    if (!id) {
        return res.status(400).json({ message: 'Yêu cầu phải có orderId và newStatus.' });
    }

    // Cập nhật trạng thái đơn hàng
    const sql = 'UPDATE `oder` SET `status` = ? WHERE `id_order` = ?';

    db.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error('Error updating order status:', err);
            return res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật trạng thái đơn hàng.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Đơn hàng không tìm thấy.' });
        }

        res.status(200).json({ message: 'Trạng thái đơn hàng đã được cập nhật thành công.' });
    });
};



//Lấy thông tin đơn hàng 
// Lấy thông tin đơn hàng
const getOrderDetail = (req, res) => {
    const orderId = req.params.id; // Lấy ID đơn hàng từ tham số URL

    const sql = `
        SELECT 
            oder.id_order, 
            oder.createdAt, 
            oder.total_price, 
            oder.paymentMethod, 
            oder.status,
            user.name, 
            address_order.detailed_address,
            address_order.phone,
            address_order.ward,
            address_order.district,
            address_order.city,
            sanpham.ten_sanpham, 
            sanpham.anh, 
            order_detail.quantity, 
            order_detail.price
        FROM oder
        JOIN user ON oder.user_id = user.id
        JOIN address_order ON oder.address_id = address_order.id
        JOIN order_detail ON oder.id_order = order_detail.order_id
        JOIN sanpham ON order_detail.product_id = sanpham.id
        WHERE oder.id_order = ?;
    `;

    db.query(sql, [orderId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.json(results);
    });
};


module.exports = { createOrder, getOrder, getOrderDetail, updateOrderStatus };
