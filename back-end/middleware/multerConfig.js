// /middleware/multerConfig.js
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../cilent/public/images'); // Đường dẫn lưu trữ file
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // Đặt tên file với timestamp
    }
});

const upload = multer({ 
    storage,
    limits: {
        fieldSize: 10 * 1024 * 1024, // Giới hạn kích thước trường là 10MB
    }
});

module.exports = upload;
