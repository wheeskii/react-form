'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // In the migration file:
await queryInterface.addColumn('Users', 'course', {
  type: Sequelize.ENUM('Information Technology', 'Computer Science'),
  allowNull: false,
});
await queryInterface.addColumn('Users', 'graduated', {
  type: Sequelize.BOOLEAN,
  allowNull: false,
});
  },

  async down (queryInterface, Sequelize) {
    /**
     * 
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
