'use strict';
const {
  Model
} = require('sequelize');

var bcryptjs = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Reservation)
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate',(user,opt)=>{
    let salt = bcryptjs.genSaltSync(8);
    let hash = bcryptjs.hashSync(user.password, salt);

    user.password = hash
  })

  return User;
};