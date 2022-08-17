'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Hotel.hasMany(models.Resertation)
      Hotel.hasMany(models.Room)
    }

    static getLocation(address) {
      const option = {}
      if(address) {
        option.where = {
          address: address
        }
      }
      return Hotel.findAll(option)
    }
  }
  Hotel.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hotel',
  });
  return Hotel;
};