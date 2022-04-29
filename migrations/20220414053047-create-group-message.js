'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GroupMessages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      groupId: {
        type: Sequelize.INTEGER
      },
      fromId: {
        type: Sequelize.INTEGER
      },
      messageId: {
        type: Sequelize.BIGINT
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
    await queryInterface.dropTable('GroupMessages');
  }
};