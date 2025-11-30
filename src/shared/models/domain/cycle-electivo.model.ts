import { SequelizeDB } from "../../../database/sequelize.js";
import { DataTypes, Model } from "sequelize";

export class CycleElectiveModel extends Model {
  public id!: string;
  public year!: number;
  public startTime!: Date;
  public finalTime!: Date;
  public state!: string;
  public fourMonthPeriod!: number;
  public examTablesEnabled!: boolean;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CycleElectiveModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
      defaultValue: "activo",
    },
    fourMonthPeriod: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    examTablesEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: SequelizeDB,
    timestamps: true,
    tableName: "CycleElective",
  }
);
