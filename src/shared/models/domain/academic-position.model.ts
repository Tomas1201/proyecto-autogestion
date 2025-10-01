import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../../database/sequelize.js";

export class AcademicPositionModel extends Model {
  public Id!: number;
  public CareerPlanId!: number;
  public SubjectId!: number;
  public year!: number;
  public FourMonthPeriod!: number;
  public ElectiveCycleId!: number;
  public ProfessorId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AcademicPositionModel.init(
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
        model: "CareerPlan",
        key: "Id",
      },
    },
    SubjectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Subject",
        key: "Id",
      },
    },
    CycleElectiveId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "CycleElective",
        key: "Id",
      },
    },
    ProfessorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Professor",
        key: "Id",
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
    tableName: "AcademicPosition",
  }
);
