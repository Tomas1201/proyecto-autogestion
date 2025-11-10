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
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    professorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Professor",
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
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schedule: {
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