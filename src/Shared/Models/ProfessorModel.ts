import { DataTypes, Model, Sequelize } from 'sequelize';
import {SequelizeDB} from '../../Database/Sequelize.js';

export class Professor extends Model {
  public Id!: string; // UUIDV4
  public Name!: string;
  public LastName!: string;
  public Dni!: string;
  public File!: string;
  public titulo_academico!: string;
  public Email!: string;
  public Phone!: string;
  public disponibilidad_horaria!: string;
  public State!: boolean;
}

Professor.init({
  Id: {
   type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  File: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  AcademicTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ScheduleAvailability: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  State: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },

}, {
    sequelize: SequelizeDB,
  timestamps: true,
  tableName: 'Professor', // Nombre de la tabla en la base de datos
});

