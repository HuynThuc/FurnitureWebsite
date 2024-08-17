// /routes/productRoutes.js
const express = require('express');
const { createProduct, 
        getProducts,
        getProductById,
        getProductsByCategory,
        getCategory, addCategory, deleteProduct, updateProduct} = require('../controllers/productController');
const upload = require('../middleware/multerConfig');
const router = express.Router();

router.post('/create', upload.single('file'), createProduct);
router.post('/loaisp', upload.single('file'), addCategory);
router.delete('/deleteProduct/:id', deleteProduct);
router.put('/updateProduct/:id', updateProduct);
router.get('/products', getProducts);
router.get('/products/:categoryId', getProductsByCategory);
router.get('/product/:id', getProductById);
router.get('/categories',getCategory);
// Các route khác như getProducts, getProductById, deleteProduct, v.v.

module.exports = router;
