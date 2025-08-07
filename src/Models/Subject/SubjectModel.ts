import {  DataTypes, Model } from 'sequelize';

import {CareerModel} from '../../Models/Career/CareerModel.js'; // ✅ Usa import default si Career es exportado con `export default`

import {sequelizeDB} from '../../Database/Sequelize.js'; 
export class Subject extends Model {
    public id!: string;
  public name!: string;
 public planning!:object;//JSONNN
 public horasCatedra!:number;
 
  public description!: string;

 
  // Sequelize añade automáticamente createdAt y updatedAt si `timestamps: true`
  
 public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}
 


sequelizeDB.define('Subject', {//terminarr
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
 
  },
  horasCatedra:{ 
    type: DataTypes.INTEGER,
    allowNull: false,


  },
  planning: {
    type: DataTypes.JSON, // Usa JSON para almacenar objetos
    allowNull: true, // Permite que sea nulo si no hay planificación
  },
}, {
  tableName: 'Subject', // ✅ tableName va aquí, no dentro de los atributos
 
  timestamps: true,
   indexes: [
    {
      unique: true,
      fields: [{ name: 'description', length: 255 }],}],
});

/*
Subject.belongsTo(CareerModel, {
  foreignKey: 'CareerId',
  as: 'Career',
});*/



sequelizeDB.sync();
export const SubjectModel = sequelizeDB.models.Subject;