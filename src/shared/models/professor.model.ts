import { DataTypes, Model, Sequelize } from 'sequelize';
import {SequelizeDB} from '../../database/sequelize.js';

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
  id: {
   type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  file: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  academicTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
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
  tableName: 'Professor', 
});

export const ProfessorModel = SequelizeDB.models.Professor;