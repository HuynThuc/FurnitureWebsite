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

    // Kiểm tra xem id_sanpham có tồn tại không
    if (!id) {
        return res.status(400).json({ Error: "Thiếu id sản phẩm" });
    }

    db.query("DELETE FROM sanpham WHERE id = ?", [id], (err, result) => {
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
        SELECT sp.*, b.banner
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


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    getProductsByCategory,
    getCategory,
    addCategory,
    deleteProduct,
    updateProduct
};
