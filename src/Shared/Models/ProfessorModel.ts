import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelizedb } from "../../Database/Sequelize.js";

export class Professor extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public dni!: string;
  public fileNumber!: string;
  public academicTitle!: string;
  public email!: string;
  public phone!: string;
  public timeAvailability!: string;
  public state!: boolean;
}

Professor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fileNumber: {
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
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeAvailability: {
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
    sequelize: sequelizedb,
    modelName: "Professor",
    tableName: "professors",
    timestamps: false,
  }
);
export const ProfessorModel = sequelizedb.models.Professor;