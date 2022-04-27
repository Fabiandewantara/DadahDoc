'use strict';
const { hashPassword } = require('../helpers/bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const admin = await queryInterface.sequelize.query(
      `SELECT id from Roles where role = "admin";`
    );
     await queryInterface.bulkInsert('Users', [
      {
          username: 'admin',
          password: hashPassword("admin"),
          roleId: admin[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date()}],
     {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
