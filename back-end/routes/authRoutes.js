// /routes/authRoutes.js
const express = require('express');
const { login, signup, getAllUsers } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/getUser', getAllUsers);

module.exports = router;
