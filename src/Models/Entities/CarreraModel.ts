import { DataTypes, Model } from 'sequelize';

import {sequelizeDB} from '../../Database/Sequelize.js'; 

export class Carrera extends Model {
    public id!: string;
  public nombre!: string;
  public cant_alumno!: number;
  public descripcion!: string;
  public duracion!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

 sequelizeDB.define('Carrera', {
  id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
        type: DataTypes.INTEGER,/**NO SE PUEDE USAR VARCHAR? */
        allowNull: false,
    },

}, { // Conexión a la base de datos
  tableName: 'Carrera',
  modelName: 'Carrera',
  timestamps: true, // Esto añade createdAt y updatedAt automáticamente
});
sequelizeDB.sync();
export const CarreraModel = sequelizeDB.models.Carrera;





