import { DataTypes, Model } from "sequelize";

import { CareerModel } from "./CareerModel.js";

import { sequelizeDB } from "../../Database/Sequelize.js";
export class Subject extends Model {
  public id!: string;
  public name!: string;
  public planning!: object; //JSONNN
  public horasCatedra!: number;

  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Subject.init(
  {
    //terminarr
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    horasCatedra: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Planning: {
      type: DataTypes.JSON, // Usa JSON para almacenar objetos
      allowNull: true, // Permite que sea nulo si no hay planificación
    },
  },
  {
    sequelize: sequelizeDB,
    tableName: "Subject",
    timestamps: true,
  }
);

export const SubjectModel = sequelizeDB.models.Subject;
