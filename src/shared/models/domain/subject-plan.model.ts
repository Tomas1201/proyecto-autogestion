import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../../database/sequelize.js";

export class SubjectPlanModel extends Model {
  public id!: number;
  public careerPlanId!: string;
  public subjectId!: string;
  public year!: number;
  public fourMonthPeriod!: number;
  public workload!: number;
  public isOptional!: boolean;
  public isAnnual!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SubjectPlanModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    careerPlanId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "CareerPlan", // Nombre de la tabla referenciada
        key: "id", // Clave primaria de la tabla referenciada
      },
    },
    subjectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Subject", // Nombre de la tabla referenciada
        key: "id", // Clave primaria de la tabla referenciada
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fourMonthPeriod: {
      type: DataTypes.INTEGER,
      allowNull: true, // Puede ser nulo si isAnnual es true
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
    tableName: "SubjectPlan", // Nombre de la tabla en la base de datos
  }
);
