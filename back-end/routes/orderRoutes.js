const express = require('express');

const { createOrder, getOrder } = require('../controllers/orderController');

const router = express.Router();

router.post('/createOrder', createOrder);
router.get('/getOrder', getOrder);
module.exports = router;