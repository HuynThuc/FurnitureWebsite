// /routes/cartRoutes.js
const express = require('express');
const { addToCart, getCart, deleteCart, decreaseQuantity, increaseQuantity } = require('../controllers/cartController');

const router = express.Router();

router.post('/cart/add', addToCart);
router.get('/api/cart/:userId', getCart);
router.delete('/cart/:id', deleteCart);
router.put('/decreasequantity/:id', decreaseQuantity);
router.put('/increasequantity/:id', increaseQuantity);



module.exports = router;
