import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../../Database/Sequelize.js";

export class Schedule extends Model {
  public id!: string; // UUIDV4
  public dia!: string;
  public hora_inicio!: string;
  public hora_fin!: string;
  public aula!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Schedule.init(
  {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    StartTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FinalTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Classroom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: SequelizeDB,
    timestamps: true, // Agrega createdAt y updatedAt
    tableName: "Schedule", // Nombre de la tabla en la base de datos
  }
);