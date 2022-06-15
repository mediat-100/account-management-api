const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const { sequelize } = require('../db');
const User = require('../models/user')(
  sequelize,
  Sequelize.DataTypes,
  Sequelize.Model
);

exports.signup = async (req, res, next) => {
  try {
    // check if user exist
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) throw new Error('User already exist');

    // if user does not exist, then create new user
    const newUser = await User.create(req.body);

    newUser.password = undefined;

    // console.log(newUser.toJSON());

    return res.status(200).json({
      status: 'success',
      message: 'Registration successful, login to continue!',
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
      error: err,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    // 1) ensure the email and password fields are filled
    if (!req.body.email || !req.body.password) {
      throw new Error('Please input your email and password');
    }

    // 2) check if user exist
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      throw new Error('User does not exist');
    }

    // 3) compare password with hashed password
    const passwordValid = await user.correctPassword(
      req.body.password,
      user.password
    );

    if (!passwordValid) throw new Error('Incorrect email or password');

    // 4) generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    user.password = undefined;

    return res.status(200).json({
      status: 'success',
      user,
      token,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
      err,
    });
  }
};
