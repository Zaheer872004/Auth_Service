'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const {SALT} = require('../config/serverConfig');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true,
      },
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[6,50],
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  // here encrypted the password is done. using the bcrypt package. before to store the data in database.
User.beforeCreate(  (user)=>{
  // bcrypt provide us to algorithm to hash or bcrypt. 
  // In the time of login user send the planetext password using bcrypt.compare we can compare it.
  const encryptedPassword = bcrypt.hashSync(user.password,SALT);
  user.password = encryptedPassword;  
})

  return User;
};