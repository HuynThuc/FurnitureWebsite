const db = require('../config/db');

// Hàm tạo đơn hàng và chi tiết đơn hàng
const createOrder = (req, res) => {
    const { userId, addressId } = req.body; // userId và addressId được truyền từ frontend

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

        // Tạo đơn hàng mới
        db.query(
            'INSERT INTO `oder` (`address_id`, `user_id`, `order_date`, `total_price`) VALUES (?, ?, ?, ?)',
            [addressId, userId, Math.floor(Date.now() / 1000), total], // Lưu tổng giá
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
    const sql = `SELECT oder.id_order, oder.total_price, user.name, address_order.*
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

module.exports = { createOrder, getOrder };
