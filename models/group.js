'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Group.hasMany(models.GroupUser, {
        foreignKey: 'groupId'
      });
    }
  }
  Group.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    avatar: DataTypes.TEXT,
    time: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
