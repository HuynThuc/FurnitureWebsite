// /routes/addressRoutes.js
const express = require('express');
const { addAddress, getAddress } = require('../controllers/addressController');

const router = express.Router();

router.post('/address/add', addAddress);
router.get('/api/address/:userId', getAddress)

module.exports = router;
