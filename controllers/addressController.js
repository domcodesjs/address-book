const { v4: uuid } = require('uuid');
const data = require('../data');
const states = require('../states');

exports.getAddresses = (req, res) => {
  res.json({
    success: true,
    addresses: data
  });
};

exports.createAddress = (req, res) => {
  const newAddress = {
    id: uuid(),
    ...req.body
  };

  data.push(newAddress);
  return res.json({ success: true, address: newAddress });
};

exports.verifyAddress = (req, res, next) => {
  const {
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zip
  } = req.body;

  if (!firstName || firstName.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'You must provide a first name'
    });
  }

  if (!lastName || lastName.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'You must provide a last name'
    });
  }

  if (!address1 || address1.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'You must provide a address'
    });
  }

  if (!address2 || address2.trim() === '') {
    req.body.address2 = '';
  }

  if (!city || city.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'You must provide a city'
    });
  }

  if (!state || state.trim() === '' || state.length !== 2) {
    return res.status(400).json({
      success: false,
      message: 'You must provide a 2 letter abbreviated state'
    });
  }

  if (!states.includes(state.toUpperCase())) {
    return res.status(400).json({
      success: false,
      message: 'You must provide a valid state'
    });
  }

  if (!zip || typeof zip !== 'number' || zip.toString().length !== 5) {
    return res.status(400).json({
      success: false,
      message: 'You must provide a 5 digit numeric zip code'
    });
  }

  next();
};

exports.deleteAddress = (req, res) => {
  const { id } = req.params;
  const addressId = data.findIndex((address) => address.id === id);

  if (addressId < 0) {
    return res.status(400).json({
      success: false,
      message: 'You must provide a valid ID'
    });
  }

  data.splice(addressId, 1);

  return res.json({
    success: true,
    message: 'Successfully deleted address'
  });
};
