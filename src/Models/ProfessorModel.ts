import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelizedb } from "../Database/Sequelize.js";

export class Professor extends Model {
  public id!: number;
  public nombre!: string;
  public apellido!: string;
  public dni!: string;
  public legajo!: string;
  public titulo_academico!: string;
  public correo!: string;
  public telefono!: string;
  public disponibilidad_horaria!: string;
  public state!: boolean;
}

sequelizedb.define(
  "Professor",
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
    apellido: {
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
      validate: { isEmail: true },
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
  },
  {
    modelName: "Professor",
    tableName: "profesores",
    timestamps: false,
  }
);
sequelizedb.sync();
export const professorModel = sequelizedb.models.Professor;
