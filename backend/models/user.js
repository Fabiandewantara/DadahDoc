'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role,{
        foreignKey: 'roleId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      User.hasMany(models.Patient,{
        foreignKey: 'userId'
      })
      User.hasMany(models.Doctor,{
        foreignKey: 'userId'
      })
    }
  }
  User.init({
    username: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'User',
    hooks: {
      beforeCreate: (User, option)=>{
        User.password = hashPassword(User.password)
      },
      beforeUpdate: (User, option)=>{
        User.password = hashPassword(User.password)
      }
    }
  });
  return User;
};