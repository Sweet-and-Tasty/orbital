
const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');

module.exports = function (req, res, next) {
  // Get token from the header
  const token = req.header('x-auth-token'); // this is the header key we wanna send the token in

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    // if token is valid
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    
    req.user = decoded.user;
    next();
  } catch (err) {
    // if token is not valid
    res.status(401).json({ msg: 'Token is not valid' });

  }
};
