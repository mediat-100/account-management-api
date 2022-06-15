'use strict';
const bcrypt = require('bcryptjs');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    correctPassword(bodyPassword, hashedPassword) {
      return bcrypt.compare(bodyPassword, hashedPassword);
    }

    changedPasswordAfter(JWTTimestamp) {
      if (this.updatedAt) {
        const changedTimeStamp = parseInt(this.updatedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimeStamp;
      }
      return false;
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      passwordConfirm: {
        allowNull: false,
        type: DataTypes.VIRTUAL,
        validate: {
          isCorrect(value) {
            if (value !== this.password) {
              throw new Error('Passwords are not the same');
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      freezeTableName: true,
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 12);
          user.password = hashedPassword;
          user.passwordConfirm = undefined;
        },
      },
    }
  );
  return User;
};

