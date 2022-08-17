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
     let rooms = JSON.parse(fs.readFileSync('./data/rooms.json','utf-8')).map(e => {
      delete e.id
      return {
        ...e,
        createdAt : new Date(),
        updatedAt : new Date()
      }
     })
  
    //  console.log(rooms);
    return queryInterface.bulkInsert('Rooms',rooms)

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
