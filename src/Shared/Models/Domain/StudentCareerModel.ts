/*Revisando implementacion, sujeto a remocion */

import { Model, DataTypes } from "sequelize";
import { SequelizeDB } from "../../../Database/Sequelize.js";

/*
Relacion entre alumnos inscriptos a carreras
 */
export class StudentCareer extends Model {
  public id!: number;
  public alumnoId!: number;
  public carreraId!: number;
  public PlanCarreraId!: number;
  public state!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StudentCareer.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    StudentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Student", // Nombre de la tabla referenciada
        key: "Id", // Clave primaria de la tabla referenciada
      },
    },
    CareerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Career", // Nombre de la tabla referenciada
        key: "Id", // Clave primaria de la tabla referenciada
      },
    },
    CareerPlanId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "CareerPlan", // Nombre de la tabla referenciada
        key: "Id", // Clave primaria de la tabla referenciada
      },
    },
    State: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active", // Estado por defecto
    },
  },
  {
    sequelize: SequelizeDB,
    timestamps: true,
    tableName: "StudentCareer", // Nombre de la tabla en la base de datos
  }
);
