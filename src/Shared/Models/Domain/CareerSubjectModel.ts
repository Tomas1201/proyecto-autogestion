import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../../Database/Sequelize.js";

SequelizeDB.define("CareerSubject", {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  CareerId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Career", // Nombre de la tabla referenciada
      key: "Id", // Clave primaria de la tabla referenciada
    },
  },
  SubjectId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Subject", // Nombre de la tabla referenciada
      key: "Id", // Clave primaria de la tabla referenciada
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
