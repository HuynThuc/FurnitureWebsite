// routes/momo.js
const express = require('express');
const router = express.Router();
const {createPayment} = require('../controllers/paymentController');

// Định tuyến cho thanh toán MoMo
router.post('/payment', createPayment);

module.exports = router;
