'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.belongsTo(models.User,{
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Patient.hasMany(models.Consultation,{
        foreignKey: 'patientId'
      })
    }
  }
  Patient.init({
    name: DataTypes.STRING,
    birthDate: DataTypes.DATEONLY,
    birthPlace: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Patient',
  });
  return Patient;
};