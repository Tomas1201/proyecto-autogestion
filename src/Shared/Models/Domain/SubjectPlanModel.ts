import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../../Database/Sequelize.js";

export class SubjectPlanModel extends Model {
  public id!: number;
  public planCarreraId!: number;
  public asignaturaId!: number;
  public anio!: number;
  public cuatrimestre!: number;
  public cargaHoraria!: number;
  public isoptativa!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SubjectPlanModel.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CareerPlanId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "CareerPlan", // Nombre de la tabla referenciada
        key: "Id", // Clave primaria de la tabla referenciada
      },
    },
    SubjectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Subject", // Nombre de la tabla referenciada
        key: "Id", // Clave primaria de la tabla referenciada
      },
    },
    Workload: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    IsOptional: {
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
