// /controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const salt = 10;


//login
const login = (req, res) => {
    const sql = "SELECT * FROM user WHERE email = ?";
    db.query(sql, [req.body.email], (err, data) => {
        if (err) {
            return res.json({ Error: "Login error", Details: err.message });
        }
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) {
                    return res.json({ Error: "Password compare error" });
                }
                if (response) {
                    const id = data[0].id;
                    const name = data[0].name;
                    const email = data[0].email;
                    const roleId = data[0].role_id;
                    const token = jwt.sign({ id, name, email, roleId }, "jwt-secret-key", { expiresIn: '1d' });
                    return res.json({ 
                        Status: "Success", 
                        Token: token, 
                        User: { id, name, email, roleId } 
                    });
                } else {
                    return res.json({ Error: "Password not matched" });
                }
            });
        } else {
            return res.json({ Error: "No name existed" });
        }
    });
};

const signup = (req, res) => {
    const getRoleIdSql = "SELECT id FROM role WHERE name = 'user'";

    db.query(getRoleIdSql, (err, result) => {
        if (err) return res.json({ Error: "Error fetching role ID from server" });

        if (result.length === 0) return res.json({ Error: "User role not found" });

        const roleId = result[0].id;

        const insertUserSql = "INSERT INTO user (name, email, password, role_id) VALUES (?, ?, ?, ?)";

        bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
            if (err) return res.json({ Error: "Error hashing password" });

            const values = [
                req.body.name,
                req.body.email,                
                hash,
                roleId
            ];

            db.query(insertUserSql, values, (err, result) => {
                if (err) return res.json({ Error: "Inserting data Error in server" });

                // Tạo JWT token và thêm thông tin về vai trò vào payload
                const token = jwt.sign({ userId: result.insertId, roleId: roleId }, 'your-secret-key');
                return res.json({ Status: "Success", Token: token });
            });
        });
    });
};

const getAllUsers = (req, res) => {
    const sql = "SELECT * FROM user"; // Câu truy vấn SQL

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Trả về danh sách người dùng dưới dạng JSON
        res.json(result);
    });
};


module.exports = { login, signup, getAllUsers};
