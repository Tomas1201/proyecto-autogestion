import { SequelizeDB } from "../../../database/sequelize.js";
import { DataTypes, Model } from "sequelize";

export class Correlation extends Model {
  public id!: number;
  public subjectToTake!: string;
  public careerId!: string;
  public subjectRequiedId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Correlation.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    subjectToTake: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    careerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subjectRequiedId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "correlations",
    sequelize: SequelizeDB,
  }
);