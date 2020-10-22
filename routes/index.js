const express = require('express');
const router = express.Router();
const {
  getAddresses,
  createAddress,
  deleteAddress,
  verifyAddress
} = require('../controllers/addressController');
const { validateBearerToken } = require('../controllers/authController');

router.get('/', getAddresses);
router.post('/', validateBearerToken, verifyAddress, createAddress);
router.delete('/:id', validateBearerToken, deleteAddress);

module.exports = router;
