'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.hasMany(models.Reservation)
      Room.belongsTo(models.Hotel)
    }
  }
  Room.init({
    capacity: DataTypes.INTEGER,
    facility: DataTypes.STRING,
    price: DataTypes.INTEGER,
    roomType: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    HotelId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};