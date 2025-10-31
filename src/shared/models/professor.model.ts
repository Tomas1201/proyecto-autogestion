import { DataTypes, Model, Sequelize } from 'sequelize';
import {SequelizeDB} from '../../database/sequelize.js';

export class Professor extends Model {
  public id!: string; // UUIDV4
  public name!: string;
  public lastName!: string;
  public dni!: string;
  public file!: string;
  public academicTitle!: string;
  public email!: string;
  public phone!: string;
  public scheduleAvailability!: string;
  public state!: boolean;
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
  scheduleAvailability: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  state: {
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