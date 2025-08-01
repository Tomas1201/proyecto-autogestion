import { DataTypes, Model, Sequelize } from 'sequelize';
import {SequelizeDB} from '../../Database/Sequelize.js';

export class Professor extends Model {
  public id!: string; // UUIDV4
  public nombre_completo!: string;
  public dni!: string;
  public legajo!: string;
  public titulo_academico!: string;
  public correo!: string;
  public telefono!: string;
  public disponibilidad_horaria!: string;
  public state!: boolean;
}

Professor.init({
  id: {
   type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,
  },
  nombre_completo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  legajo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  titulo_academico: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  disponibilidad_horaria: {
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
  modelName: 'Professor',
  tableName: 'professors',
  timestamps: false,
});

