'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.belongsTo(models.Schedule,{
        foreignKey: 'scheduleId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Doctor.belongsTo(models.User,{
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Doctor.hasMany(models.Consultation,{
        foreignKey: 'doctorId'
      })
    }
  }
  Doctor.init({
    name: DataTypes.STRING,
    birthDate: DataTypes.DATEONLY,
    birthPlace: DataTypes.STRING,
    scheduleId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Doctor',
  });
  return Doctor;
};