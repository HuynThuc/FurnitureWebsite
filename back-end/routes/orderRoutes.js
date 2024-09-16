const express = require('express');

const { createOrder, getOrder, getOrderDetail, updateOrderStatus} = require('../controllers/orderController');

const router = express.Router();

router.post('/createOrder', createOrder);
router.get('/getOrder', getOrder);
router.get('/getOrderDetail/:id', getOrderDetail)
router.put('/updateStatus/:id', updateOrderStatus);
module.exports = router;