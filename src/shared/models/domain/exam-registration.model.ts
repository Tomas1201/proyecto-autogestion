import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../../database/sequelize.js";

export class ExamRegistration extends Model {
  public id!: number;
  public studentId!: string;
  public finalExamId!: number;
  public grade!: number | null;
  public status!: string; 

  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ExamRegistration.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Student",
        key: "id",
      },
    },
    finalExamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "FinalExam",
        key: "id",
      },
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'REGISTERED',
    },
  },
  {
    sequelize: SequelizeDB,
    timestamps: true,
    tableName: "ExamRegistration",
  }
);
