'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PrivateMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      PrivateMessage.belongsTo(models.Messages, {
        foreignKey: 'messageId'
      });
    }
  }
  PrivateMessage.init({
    toId: DataTypes.INTEGER,
    fromId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER,
    isRead: DataTypes.BOOLEAN,
    isRecived: DataTypes.BOOLEAN,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PrivateMessage',
  });
  return PrivateMessage;
};
