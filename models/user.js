'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt')


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      User.hasMany(models.Comment, {
        foreignKey: 'userId'
      });

      User.hasMany(models.Post, {
        foreignKey: 'userId'
      });

      User.hasMany(models.PostLike, {
        foreignKey: 'userId'
      });

      User.hasMany(models.PrivateMessage, {
        foreignKey: 'fromId'
      });

      User.hasMany(models.PrivateMessage, {
        foreignKey: 'toId'
      });

      User.hasMany(models.GroupMessage, {
        foreignKey: 'fromId'
      });

      User.hasMany(models.GroupUser, {
        foreignKey: 'userId'
      });

    }
  }
  User.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    age: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });

  return User;
};