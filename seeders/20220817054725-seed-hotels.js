'use strict';

const fs = require('fs');

module.exports = {
    up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let hotels = JSON.parse(fs.readFileSync('./data/hotels.json','utf-8')).map(e => {
      delete e.id
      return {
        ...e,
        createdAt : new Date(),
        updatedAt : new Date()
      }
     })
  
    //  console.log(hotels);
    return queryInterface.bulkInsert('Hotels',hotels)

  },

    down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Hotels')
  }
};
