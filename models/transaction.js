'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      pin: {
        allowNull: true,
        type: DataTypes.VIRTUAL,
        validate: {
          len: 4,
        },
      },
      accountNumber: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      accountName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      // transactionType: {
      //   allowNull: false,
      //   type: DataTypes.ENUM,
      //   values: ['deposit', 'withdraw'],
      // },
    },
    {
      sequelize,
      modelName: 'Transaction',
      freezeTableName: true,
      timestamps: true,
    }
  );
  return Transaction;
};
