import { Sequelize, DataTypes, Model } from 'sequelize';

import {sequelizeDB} from '../Database/Sequelize.js'; 
export class Carrera extends Model {
    public id!: number;
  public nombre!: string;
  public cant_alumno!: number;
  public descripcion!: string;
  public duracion!: string;
  // Sequelize añade automáticamente createdAt y updatedAt si `timestamps: true`
  
 public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}


const CarreraModel= Carrera.init( {
  id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cant_alumno: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    duracion: {
        type: DataTypes.CHAR,/**NO SE PUEDE USAR VARCHAR? */
        allowNull: false,
    },

}, {sequelize: sequelizeDB, // Conexión a la base de datos

  tableName: 'Carrera',
  modelName: 'Carrera',
  timestamps: true, // Esto añade createdAt y updatedAt automáticamente
});

export default CarreraModel;

/*
sequelize.sync();
export const CarreraModel = sequelize.models.Carrera;
*/
