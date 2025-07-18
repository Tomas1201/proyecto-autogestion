import { DataTypes, Model } from 'sequelize';

import {sequelizeDB} from '../Database/Sequelize.js'; 

export class Carrera extends Model {
    public id!: number;
  public nombre!: string;
  public cant_alumno!: number;
  public descripcion!: string;
  public duracion!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

 sequelizeDB.define('Carrera', {
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
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    duracion: {
        type: DataTypes.CHAR,/**NO SE PUEDE USAR VARCHAR? */
        allowNull: false,
    },

}, { // Conexión a la base de datos
  tableName: 'Carrera',
  modelName: 'Carrera',
  timestamps: true, // Esto añade createdAt y updatedAt automáticamente
});
sequelizeDB.sync();
export const CarreraModel = sequelizeDB.models.Carrera;





