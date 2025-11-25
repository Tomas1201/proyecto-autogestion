import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../../database/sequelize.js";

SequelizeDB.define("CareerSubject", {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  CareerId: {
    type: DataTypes.UUID,
    references: {
      model: "Career", // Nombre de la tabla referenciada
      key: "id", // Clave primaria de la tabla referenciada
    },
  },
  SubjectId: {
    type: DataTypes.UUID,
    references: {
      model: "Subject", // Nombre de la tabla referenciada
      key: "id", // Clave primaria de la tabla referenciada
    },
  },
  StudentId: {
    type: DataTypes.INTEGER,
  },
  EvaluationId: {
    type: DataTypes.INTEGER,
  },
});

export const C_AModel = SequelizeDB.models.CareerSubject;
