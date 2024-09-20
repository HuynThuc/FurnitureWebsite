const db = require('../config/db');


//Tạo product
const createProduct = (req, res) => {
   

    const sql = "INSERT INTO sanpham (ten_sanpham, mo_ta, gia, id_loaisanpham, anh) VALUES (?, ?, ?, ?, ?)";
    const values = [
        req.body.ten_sanpham,
        req.body.mo_ta,
        req.body.gia,
        req.body.id_loaisanpham,
        req.file.filename 
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.json({ Error: "Error creating product" });
        }
        return res.json({ Status: "Success" });
    });
};


//Xóa sản phẩm
const deleteProduct = (req, res) => {
    const { id } = req.params;

    // Kiểm tra xem id có tồn tại không
    if (!id) {
        return res.status(400).json({ error: "Thiếu id sản phẩm" });
    }

    const deleteQuery = "DELETE FROM sanpham WHERE id = ?";
    db.query(deleteQuery, [id], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);

            // Kiểm tra mã lỗi để xác định lỗi khóa ngoại
            if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(400).json({ 
                    error: "Không thể xóa sản phẩm vì nó đang được tham chiếu trong đơn hàng." 
                });
            }

            // Các lỗi khác
            return res.status(500).json({ error: "Lỗi server, không thể xóa sản phẩm." });
        }

        // Kiểm tra nếu không có hàng nào bị ảnh hưởng (tức là không tìm thấy sản phẩm)
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Sản phẩm không tìm thấy." });
        }

        // Xóa thành công
        res.json({ message: "Sản phẩm đã được xóa thành công." });
    });
};


//Sửa sản phẩm
const updateProduct = (req, res) => {
    const { id } = req.params;
    const { ten_sanpham, mo_ta, gia } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Thiếu thông tin cần thiết!' });
    }

    const sql = "UPDATE sanpham SET ten_sanpham = ?, mo_ta = ?, gia = ? WHERE id = ?";
    const values = [ten_sanpham, mo_ta, gia, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            return res.status(500).json({ error: "Internal server error" });
        } else if (result.affectedRows > 0) {
            return res.json({ message: "Product updated successfully" });
        } else {
            return res.status(404).json({ error: "Product not found" });
        }
    });
};

//Thêm loại sản phẩm
const addCategory = (req, res) => {
    const sql ="INSERT INTO loaisp (ten_loaisp, banner) VALUES(?, ?)";
    const values = [
     req.body.ten_loaisp,
     req.file.filename
    ];
    db.query(sql, values, (err, result) => {
     if (err) {
       console.error('Error executing query:', err);
       return res.json({ Error: "Error signup query" });
     }
     return res.json({ Status: "Success" });
   });
}

// Lấy tất cả các sản phẩm
const getProducts = (req, res) => {
    const sql = "SELECT * FROM sanpham";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.json(results);
    });
};


// Lấy sản phẩm theo ID
const getProductById = (req, res) => {
    const productId = req.params.id;
    const sql = "SELECT * FROM sanpham WHERE id = ?";
    db.query(sql, [productId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        } else if (results.length > 0) {
            return res.json(results[0]);
        } else {
            return res.status(404).json({ error: "Product not found" });
        }
    });
};


// Lấy sản phẩm theo loại sản phẩm
const getProductsByCategory = (req, res) => {
    const categoryId = req.params.categoryId;
    const sql = `
        SELECT sp.*, b.banner, b.ten_loaisp
        FROM sanpham sp
        JOIN loaisp b ON sp.id_loaisanpham = b.id_loaisanpham
        WHERE sp.id_loaisanpham = ?;
    `;
    db.query(sql, [categoryId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.json(results);
    });
};

//Lấy loại sản phẩm
const getCategory = (req, res) => {
    const sql = "SELECT * FROM loaisp"; // "sanpham" là tên bảng sản phẩm của bạn
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.json(results);
        }
    });
}


const deleteCategory = (req, res) => {
    const { id } = req.params;

    // Kiểm tra xem id_sanpham có tồn tại không
    if (!id) {
        return res.status(400).json({ Error: "Thiếu id loại sản phẩm" });
    }

    db.query("DELETE FROM loaisp WHERE id_loaisanpham = ?", [id], (err, result) => {
        if (err) {
            console.error('Error deleting cart item:', err);
            res.status(500).json({ error: "Internal server error" });
        } else {
            if (result.affectedRows > 0) {
                res.json({ message: " deleted successfully" });
            } else {
                res.status(404).json({ error: " not found" });
            }
        }
    });
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    getProductsByCategory,
    getCategory,
    addCategory,
    deleteProduct,
    updateProduct,
    deleteCategory
};
