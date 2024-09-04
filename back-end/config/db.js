// /config/db.js
const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "moho",
    charset: 'utf8mb4' // Đảm bảo kết nối sử dụng UTF-8
});

module.exports = db;
