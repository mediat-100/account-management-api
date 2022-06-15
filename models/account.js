'use strict';
const bcrypt = require('bcryptjs');
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Account.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      accountName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      accountNumber: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      balance: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      pin: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: 4,
        },
      },
    },
    {
      sequelize,
      modelName: 'Account',
      freezeTableName: true,
      timestamps: true,
      hooks: {
        beforeCreate: async (account) => {
          const hashedPin = await bcrypt.hash(account.pin, 12);
          account.pin = hashedPin;
        },
      },
    }
  );
  return Account;
};
