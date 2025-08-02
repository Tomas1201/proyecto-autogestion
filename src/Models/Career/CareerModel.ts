import { DataTypes, Model } from 'sequelize';

import {sequelizeDB} from '../../Database/Sequelize.js'; 

export class Career extends Model {
    public id!: string;
  public name!: string;
  public numberStudents!: number;
  public description!: string;
  public duration!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

 sequelizeDB.define('Career', {
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
    numberStudents: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    duration: {
        type: DataTypes.INTEGER,/**NO SE PUEDE USAR VARCHAR? */
        allowNull: false,
    },

}, { // Conexión a la base de datos
  tableName: 'Career',
  modelName: 'Career',
  timestamps: true, // Esto añade createdAt y updatedAt automáticamente
});
sequelizeDB.sync();
export const CareerModel = sequelizeDB.models.Career;





