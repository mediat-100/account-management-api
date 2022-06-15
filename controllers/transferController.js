const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const { sequelize } = require('../db');
const Transfer = require('../models/transfer')(
  sequelize,
  Sequelize.DataTypes,
  Sequelize.Model
);
const Account = require('../models/account')(
  sequelize,
  Sequelize.DataTypes,
  Sequelize.Model
);

exports.transfer = async (req, res, next) => {
  try {
    // check if account is valid;
    const transferFrom = await Account.findOne({
      where: {
        userId: req.user.id,
      },
    });

    if (!transferFrom)
      throw new Error('Invalid account, You cannot perform this action');

    const transferTo = await Account.findOne({
      where: {
        accountName: req.body.accountName,
        accountNumber: req.body.accountNumber,
      },
    });

    if (!transferTo)
      throw new Error('Invalid!!! Please input correct account details');

    const hashedPin = await bcrypt.compare(req.body.pin, transferFrom.pin);
    if (!hashedPin) throw new Error('Invalid pin');

    if (Number(transferFrom.balance) < Number(req.body.amount))
      throw new Error('Insufficient Funds');

    transferFrom.balance =
      Number(transferFrom.balance) - Number(req.body.amount);

    await transferFrom.save();

    transferTo.balance = Number(transferTo.balance) + Number(req.body.amount);

    await transferTo.save();

    const transfer = await Transfer.create({
      accountNumber: req.body.accountNumber,
      accountName: req.body.accountName,
      txFrom: transferFrom.accountName,
      amount: req.body.amount,
    });

    return res.status(200).json({
      status: 'Success',
      msg: 'Transfer successful!!!',
      transfer,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      msg: err.message,
      err,
    });
  }
};
