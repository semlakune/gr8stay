'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reservation.belongsTo(models.User)
      Reservation.belongsTo(models.Hotel)
      Reservation.belongsTo(models.Room)

    }
  }
  Reservation.init({
    guestName: DataTypes.STRING,
    checkIn: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter check-in date'
        },
        notNull: {
          msg: 'Please enter check-in date'
        },
        isToday(date) {
          if (new Date(date).getDay() < new Date().getDay()) {
            throw new Error('Maximum check-in date is today');
          }
        }
      }
    },
    checkOut: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter check-out date'
        },
        notNull: {
          msg: 'Please enter check-out date'
        },
        //TODO: min tanggal checkout hari besok
        isTomorow(date) {
          if (new Date(date).getDay() < new Date().getDay(date) + 1) {
            throw new Error('Minimum check-out date is tomorow');
          }
        }
      }
    },
    UserId: DataTypes.INTEGER,
    HotelId: DataTypes.INTEGER,
    RoomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};