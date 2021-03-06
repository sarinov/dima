'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Messages.hasMany(models.PrivateMessage, {
        foreignKey: 'messageId'
      })
    }
  }
  Messages.init({
    content: DataTypes.TEXT,
    type: DataTypes.STRING,
    time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Messages',
  });
  return Messages;
};
