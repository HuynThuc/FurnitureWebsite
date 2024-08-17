// /controllers/cartController.js
const db = require('../config/db');

// Tạo các hàm controller tương tự như trong productController.js
const addToCart = (req, res) => {
    const { id_product, user_id, quantity } = req.body;

    if (!id_product || !user_id || !quantity) { 
        return res.status(400).json({ message: 'Thiếu thông tin cần thiết!' });
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng của người dùng chưa
    const checkCartQuery = `SELECT * FROM cart_items WHERE id_product = ? AND user_id = ?`;
    db.query(checkCartQuery, [id_product, user_id], (err, result) => {
        if (err) {
            console.error('Error checking cart:', err);
            return res.status(500).json({ message: 'Lỗi khi kiểm tra giỏ hàng' });
        }

        if (result.length > 0) {
            // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
            const updateQuery = `UPDATE cart_items SET quantity = quantity + ? WHERE id_product = ? AND user_id = ?`;
            db.query(updateQuery, [quantity, id_product, user_id], (err, updateResult) => {
                if (err) {
                    console.error('Error updating cart:', err);
                    return res.status(500).json({ message: 'Lỗi khi cập nhật giỏ hàng' });
                }
                return res.status(200).json({ message: 'Cập nhật giỏ hàng thành công' });
            });
        } else {
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới
            const insertQuery = `INSERT INTO cart_items (id_product, user_id, quantity) VALUES (?, ?, ?)`;
            db.query(insertQuery, [id_product, user_id, quantity], (err, insertResult) => {
                if (err) {
                    console.error('Error inserting into cart:', err);
                    return res.status(500).json({ message: 'Lỗi khi thêm sản phẩm vào giỏ hàng' });
                }
                return res.status(201).json({ message: 'Thêm sản phẩm vào giỏ hàng thành công' });
            });
        }
    });
};


//Lấy thông tin giỏ hàng
const getCart = (req, res) => {
    const userId = req.params.userId;
    const sql = `
        SELECT cart_items.cart_item_id, cart_items.quantity, sanpham.ten_sanpham, sanpham.gia, sanpham.anh,
               (cart_items.quantity * sanpham.gia) AS item_total,
               (SELECT SUM(cart_items.quantity * sanpham.gia)
                FROM cart_items
                JOIN sanpham ON cart_items.id_product = sanpham.id
                WHERE cart_items.user_id = ?) AS total
        FROM cart_items
        JOIN sanpham ON cart_items.id_product = sanpham.id
        WHERE cart_items.user_id = ?`;

    db.query(sql, [userId, userId], (err, data) => {
        if (err) {
            return res.status(500).json({ Error: "Database error", Details: err.message });
        }
        // Trả về dữ liệu chi tiết và tổng giá trị
        const response = {
            items: data,
            total: data.length > 0 ? data[0].total : 0
        };
        res.json(response);
    });
};


//Xóa giỏ hàng
const deleteCart = (req, res) => {
    const cart_item_id = req.params.id;
    // Thực hiện truy vấn xóa sản phẩm khỏi giỏ hàng
    db.query("DELETE FROM cart_items WHERE cart_item_id = ?", [cart_item_id], (err, result) => {
        if (err) {
            console.error('Error deleting cart item:', err);
            res.status(500).json({ error: "Internal server error" });
        } else {
            if (result.affectedRows > 0) {
                res.json({ message: "Cart item deleted successfully" });
            } else {
                res.status(404).json({ error: "Cart item not found" });
            }
        }
    });
}


//Cập nhật số lượng
const decreaseQuantity = (req, res) => {
    const cart_item_id = req.params.id;
    const { quantity } = req.body;

    const query = "UPDATE cart_items SET quantity = quantity - ? WHERE cart_item_id = ?";
    const values = [quantity, cart_item_id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating cart item quantity:', err);
            res.status(500).json({ error: "Internal server error" });
        } else {
            if (result.affectedRows > 0) {
                res.json({ message: "Cart item quantity updated successfully" });
            } else {
                res.status(404).json({ error: "Cart item not found" });
            }
        }
    });
}


//Cập nhật số lượng tăng 
const increaseQuantity = (req, res) => {
    const cart_item_id = req.params.id;
    const { quantity } = req.body;

    const query = "UPDATE cart_items SET quantity = quantity + ? WHERE cart_item_id = ?";
    const values = [quantity, cart_item_id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating cart item quantity:', err);
            res.status(500).json({ error: "Internal server error" });
        } else {
            if (result.affectedRows > 0) {
                res.json({ message: "Cart item quantity updated successfully" });
            } else {
                res.status(404).json({ error: "Cart item not found" });
            }
        }
    });
}

module.exports = { addToCart, getCart, deleteCart, decreaseQuantity, increaseQuantity};
