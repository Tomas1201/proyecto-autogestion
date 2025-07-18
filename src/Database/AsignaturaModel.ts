import { DataTypes, Model } from 'sequelize';
import { sequelizedb } from './Sequelize.js';

export class Asignatura extends Model {
  public id!: number;
  public nombre!: string;
  public dia!: string;
  public horaInicio!: string;
  public horaFin!: string;
}

Asignatura.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dia: {
      type: DataTypes.ENUM('lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'),
      allowNull: false,
    },
    horaInicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    horaFin: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize : sequelizedb,
    modelName: 'Asignatura',
    tableName: 'asignaturas',
    timestamps: true,
  }
);
//Lo "reescribe"
sequelizedb.sync();
export const AsignaturaModel = sequelizedb.models.Asignatura;