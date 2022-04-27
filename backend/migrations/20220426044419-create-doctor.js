'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Doctors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      birthDate: {
        type: Sequelize.DATEONLY
      },
      birthPlace: {
        type: Sequelize.STRING
      },
      scheduleId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model: 'Schedules',
          key: 'id',
          as: 'scheduleId'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    }, {
      paranoid: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Doctors');
  }
};