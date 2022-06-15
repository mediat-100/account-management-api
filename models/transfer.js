'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transfer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transfer.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      accountNumber: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      accountName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      txFrom: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      pin: {
        allowNull: true,
        type: DataTypes.VIRTUAL,
        validate: {
          len: 4,
        },
      },
    },
    {
      sequelize,
      modelName: 'Transfer',
      freezeTableName: true,
      timestamps: true,
    }
  );
  return Transfer;
};
