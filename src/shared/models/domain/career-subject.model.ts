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
      model: "Career", 
      key: "id", 
    },
  },
  SubjectId: {
    type: DataTypes.UUID,
    references: {
      model: "Subject", 
      key: "id", 
    },
  },

});

export const C_AModel = SequelizeDB.models.CareerSubject;
