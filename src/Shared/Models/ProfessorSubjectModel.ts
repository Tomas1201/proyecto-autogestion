import { DataTypes, Model } from "sequelize";
import { sequelizedb } from "../../Database/Sequelize.js";

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
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "professors",
        key: "id",
      },
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "subjects",
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
    sequelize: sequelizedb,
    modelName: "ProfessorSubject",
    tableName: "professor_subjects",
    timestamps: true,
  }
);

export const ProfessorSubjectModel = sequelizedb.models.ProfessorSubject;