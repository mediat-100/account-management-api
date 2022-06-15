const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { sequelize } = require('../db');
const Account = require('../models/account')(
  sequelize,
  Sequelize.DataTypes,
  Sequelize.Model
);

// 1) You must be authenticated to create account
exports.createAccount = async (req, res, next) => {
  try {
    let userId = req.user.id;

    const existingAccount = await Account.findOne({
      where: {
        [Op.or]: [
          { accountNumber: req.body.accountNumber },
          {
            userId,
          },
        ],
      },
    });

    if (existingAccount) throw new Error('Account already exist');

    const newAccount = await Account.build(req.body);

    newAccount.userId = userId;

    await newAccount.save();

    newAccount.pin = undefined;

    return res.status(200).json({
      status: 'success',
      msg: 'Account created successfully!!!',
      account: newAccount,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      msg: err.message,
      err,
    });
  }
};

exports.getAccount = async (req, res, next) => {
  try {
    const account = await Account.findOne({
      where: {
        userId: req.user.id,
      },
    });

    if (!account) throw new Error('Account not found!');

    account.pin = undefined;

    return res.status(200).json({
      status: 'success',
      account,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      msg: err.message,
      err,
    });
  }
};
