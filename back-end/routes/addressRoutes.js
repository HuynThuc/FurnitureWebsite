// /routes/addressRoutes.js
const express = require('express');
const { addAddress, getAddress, deleteAddress} = require('../controllers/addressController');

const router = express.Router();

router.post('/address/add', addAddress);
router.get('/api/address/:userId', getAddress)
router.delete('/deleteAddress/:id', deleteAddress )

module.exports = router;
