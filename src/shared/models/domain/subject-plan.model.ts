import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../../database/sequelize.js";

export class SubjectPlanModel extends Model {
  public id!: string;
  public careerId!: string;
  public subjectId!: string;
  public year!: number;
  public fourMonthPeriod!: number;
  public workload!: number;
  public isOptional!: boolean;
  public isAnnual!: boolean ;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SubjectPlanModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    careerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Career", 
        key: "id", 
      },
    },
    subjectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Subject", 
        key: "id", 
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fourMonthPeriod: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    isAnnual: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    workload: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isOptional: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: SequelizeDB,
    timestamps: true,
    tableName: "SubjectPlan", 
  }
);
