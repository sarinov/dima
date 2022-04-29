'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PrivateMessages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      toId: {
        type: Sequelize.INTEGER
      },
      fromId: {
        type: Sequelize.INTEGER
      },
      chatId: {
        type: Sequelize.BIGINT
      },
      messageId: {
        type: Sequelize.INTEGER
      },
      isRead: {
        type: Sequelize.BOOLEAN
      },
      isRecived: {
        type: Sequelize.BOOLEAN
      },
      status: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PrivateMessages');
  }
};
