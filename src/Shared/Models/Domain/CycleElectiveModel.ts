import { SequelizeDB } from "../../../Database/Sequelize.js";
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
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    StartTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    FinalTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    State: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "activo", // Valores posibles: 'activo', 'inactivo'
    },
    FourMonthPeriod: {
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
