import { DataTypes, Model, Sequelize } from "sequelize";
import { SequelizeDB } from "../../Database/Sequelize.js";

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
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
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
    timeAvailability: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    State: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: SequelizeDB,
    modelName: "Professor",
    tableName: "professor",
    timestamps: true,
  }
);
export const ProfessorModel = SequelizeDB.models.Professor;