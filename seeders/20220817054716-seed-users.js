'use strict';

const fs = require('fs')

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
   let users = JSON.parse(fs.readFileSync('./data/users.json','utf-8')).map(e => {
    delete e.id
    return {
      ...e,
      createdAt : new Date(),
      updatedAt : new Date()
    }
   })

  //  console.log(users);
  return queryInterface.bulkInsert('Users',users)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
