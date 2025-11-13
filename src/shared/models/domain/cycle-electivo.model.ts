import { SequelizeDB } from "../../../database/sequelize.js";
import { DataTypes, Model } from "sequelize";

export class CycleElectiveModel extends Model {
  public id!: number;
  public anio!: number;
  public fecha_inicio!: Date;
  public fecha_fin!: Date;
  public estado!: string;
  public cuatrimestre!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CycleElectiveModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    finalTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "activo", // Valores posibles: 'activo', 'inactivo'
    },
    fourMonthPeriod: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: SequelizeDB,
    timestamps: true, // Agrega createdAt y updatedAt
    tableName: "CycleElective", // Nombre de la tabla en la base de datos
  }
);
