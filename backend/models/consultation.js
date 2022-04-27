'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consultation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Consultation.belongsTo(models.Doctor,{
        foreignKey: 'doctorId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Consultation.belongsTo(models.Patient,{
        foreignKey: 'patientId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Consultation.init({
    doctorId: DataTypes.INTEGER,
    patientId: DataTypes.INTEGER,
    consulDate: DataTypes.DATEONLY,
    info: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Consultation',
  });
  return Consultation;
};