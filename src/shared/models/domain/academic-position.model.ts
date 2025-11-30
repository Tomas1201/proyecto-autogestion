import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../../database/sequelize.js";

export class AcademicPositionModel extends Model {
  public id!: string;
  public careerId!: string;
  public subjectId!: string;
  public year!: number;
  public fourMonthPeriod!: number;
  public electiveCycleId!: number;
  public professorId!: number;

  
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
