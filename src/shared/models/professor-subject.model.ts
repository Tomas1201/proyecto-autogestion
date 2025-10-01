import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../database/sequelize.js";

export class ProfessorSubject extends Model {
  public id!: number;
  public professorId!: number;
  public subjectId!: number;
  public role!: string;
  public schedule!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProfessorSubject.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ProfessorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Professor",
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
    Role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Schedule: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: SequelizeDB,
    modelName: "ProfessorSubject",
    tableName: "ProfessorSubject",
    timestamps: true,
  }
);

export const ProfessorSubjectModel = SequelizeDB.models.ProfessorSubject;