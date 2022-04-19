'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      GroupMessage.belongsTo(models.User, {
        foreignKey: 'fromId'
      });

      GroupMessage.belongsTo(models.Messages, {
        foreignKey: 'messageId'
      });

      GroupMessage.belongsTo(models.Groups, {
        foreignKey: 'messageId'
      });

    }
  }
  GroupMessage.init({
    groupId: DataTypes.INTEGER,
    fromId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER,
    isRead: DataTypes.BOOLEAN,
    isRecived: DataTypes.BOOLEAN,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GroupMessage',
  });
  return GroupMessage;
};