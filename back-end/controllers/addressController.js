// /controllers/addressController.js
const db = require('../config/db');

//Thêm địa chỉ
const addAddress = (req, res) => {
    const { user_id, name, phone, city, district, ward, detail_address } = req.body;
  
    // Kiểm tra các trường bắt buộc
    if (!user_id || !name || !phone || !city || !district || !ward || !detail_address) {
      return res.status(400).json({ Error: "Thiếu thông tin yêu cầu" });
    }
  
    const sql = "INSERT INTO address_order(user_id, name, phone, city, district, ward, detailed_address) VALUES (?,?,?,?,?,?,?)";
    const values = [user_id, name, phone, city, district, ward, detail_address];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ Error: "Lỗi khi tạo địa chỉ" });
      }
      return res.json({ Status: "Success" });
    });
  };


//Lấy thông tin địa chỉ 
const getAddress = (req, res) => {
    const userId = req.params.userId; 
    const sql = 'SELECT * FROM address_order WHERE user_id = ?'
    db.query(sql, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.json(results);
    });
}

const deleteAddress = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE address_order FROM address_order WHERE id = ?" 
  db.query(sql, [id], (err, results) => {
    if (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
    return res.json(results);
});

}
  


module.exports = { addAddress, getAddress, deleteAddress };
