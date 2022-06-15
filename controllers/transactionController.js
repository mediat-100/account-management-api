const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const { sequelize } = require('../db');
const Transaction = require('../models/transaction')(
  sequelize,
  Sequelize.DataTypes,
  Sequelize.Model
);
const Account = require('../models/account')(
  sequelize,
  Sequelize.DataTypes,
  Sequelize.Model
);

exports.deposit = async (req, res, next) => {
  try {
    // 1) verify if user have an account
    const userAccount = await Account.findOne({
      where: {
        userId: req.user.id,
      },
    });

    if (!userAccount) throw new Error('User does not have an account!');

    const hashedPin = await bcrypt.compare(req.body.pin, userAccount.pin);
    if (!hashedPin) throw new Error('Invalid pin');

    const accountBalance =
      Number(userAccount.balance) + Number(req.body.amount);

    userAccount.balance = Number(accountBalance);

    await userAccount.save();

    const transaction = await Transaction.create({
      accountNumber: userAccount.accountNumber,
      accountName: userAccount.accountName,
      accountId: userAccount.id,
      transactionType: req.query.type,
      amount: req.body.amount,
    });

    return res.status(200).json({
      status: 'success',
      msg: 'Deposit successful!',
      transaction,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      msg: err.message,
      err,
    });
  }
};

exports.withdraw = async (req, res, next) => {
  try {
    const userAccount = await Account.findOne({
      where: {
        userId: req.user.id,
      },
    });

    if (!userAccount) throw new Error('User does not have an account!');

    const hashedPin = await bcrypt.compare(req.body.pin, userAccount.pin);
    if (!hashedPin) throw new Error('Invalid pin');

    if (Number(userAccount.balance) < Number(req.body.amount))
      throw new Error('Insufficient funds');

    const accountBalance =
      Number(userAccount.balance) - Number(req.body.amount);

    userAccount.balance = Number(accountBalance);

    await userAccount.save();

    const transaction = await Transaction.create({
      accountNumber: userAccount.accountNumber,
      accountName: userAccount.accountName,
      accountId: userAccount.id,
      amount: req.body.amount,
    });

    return res.status(200).json({
      status: 'success',
      msg: 'Withdrawal successful!',
      transaction,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      msg: err.message,
      err,
    });
  }
};
