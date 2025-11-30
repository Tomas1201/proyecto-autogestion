import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../../database/sequelize.js";

export class Schedule extends Model {
  public id!: string; 
  public day!: string;
  public startTime!: string;
  public finalTime!: string;
  public classroom!: string;
  public academicPositionId!: number;

  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Schedule.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    finalTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    classroom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    academicPositionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "AcademicPosition",
        key: "id",
      },
    },
  },
  {
    sequelize: SequelizeDB,
    timestamps: true,
    tableName: "Schedule",
  }
);