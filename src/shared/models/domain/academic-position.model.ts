import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../../database/sequelize.js";

export class AcademicPositionModel extends Model {
  public id!: string;
  public subjectPlanId!: string;
  public electiveCycleId!: string;
  public professorId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AcademicPositionModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    subjectPlanId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "SubjectPlan",
        key: "id",
      },
    },
    electiveCycleId: {
      type: DataTypes.UUID,
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
    }
  },
  {
    sequelize: SequelizeDB,
    timestamps: true,
    tableName: "AcademicPosition",
  }
);
