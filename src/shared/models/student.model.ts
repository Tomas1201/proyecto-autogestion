import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../database/sequelize.js";

export class Student extends Model {
  public id!: number;
  public name!: string;
  public lastName!: string;
  public email!: string;
  public file!: number;
  public status!: string;
  public dni!: number;
  public career!: string[]; // puede ser nulo

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Student.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    file: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM("activo", "inactivo", "graduado"),
      allowNull: false,
      defaultValue: "activo",
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    career: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: SequelizeDB,
    timestamps: true,
    tableName: "Student", // Nombre de la tabla en la base de datos
  }
);
