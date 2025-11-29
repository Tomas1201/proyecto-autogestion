

import { Model, DataTypes } from "sequelize";
import { SequelizeDB } from "../../../database/sequelize.js";


export class StudentCareer extends Model {
  public id!: string;
  public studentId!: string;
  public careerId!: string;
  public careerPlanId!: string;
  public state!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StudentCareer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
     
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Student",
        key: "id", 
      },
    },
    careerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Career",
        key: "id", 
      },
    },
    careerPlanId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "CareerPlan",
        key: "id",
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    sequelize: SequelizeDB,
    timestamps: true,
    tableName: "StudentCareer",
  }
);
