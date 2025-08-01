import { DataTypes, Model } from "sequelize";
import { sequelizedb } from "../Database/Sequelize.js";

export class ProfessorAsignatura extends Model {
  public id!: number;
  public professorId!: number;
  public asignaturaId!: number;
  public rol!: string;
  public horario!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProfessorAsignatura.init(
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
        model: "profesores",
        key: "id",
      },
    },
    asignaturaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "asignaturas",
        key: "id",
      },
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    horario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizedb,
    modelName: "ProfessorAsignatura",
    tableName: "professor_asignaturas",
    timestamps: true,
  }
);

export const ProfessorAsignaturaModel = sequelizedb.models.ProfessorAsignatura;
