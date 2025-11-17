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
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    careerPlanId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "CareerPlan",
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
    cycleElectiveId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "CycleElective",
        key: "id",
      },
    },
    professorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Professor",
        key: "id",
      },
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
    tableName: "AcademicPosition",
  }
);
