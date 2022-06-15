const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const { sequelize } = require('../db');
const User = require('../models/user')(
  sequelize,
  Sequelize.DataTypes,
  Sequelize.Model
);

const auth = async (req, res, next) => {
  try {
    // 1) check for token
    const token = req.headers['x-auth-token'];
    if (!token) throw new Error('Access denied!!!');

    // 2) verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // 3) check if user still exists
    const user = await User.findByPk(decoded.id);

    if (!user) throw new Error('User not found!');

    // 4) check if user change password after token was issued
    if (user.changedPasswordAfter(decoded.iat))
      throw new Error('User recently changed password please login again');

    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
      error: err,
    });
  }
};

module.exports = auth;
