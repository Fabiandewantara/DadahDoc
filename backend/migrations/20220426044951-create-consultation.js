'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Consultations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctorId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model: 'Doctors',
          key: 'id',
          as: 'doctorId'
        }
      },
      patientId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model: 'Patients',
          key: 'id',
          as: 'patientId'
        }
      },
      consulDate: {
        type: Sequelize.DATEONLY
      },
      info: {
        type: Sequelize.STRING
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Consultations');
  }
};