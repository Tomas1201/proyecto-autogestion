import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../Database/Sequelize.js";

export class Subject extends Model {
  public id!: number;
  public name!: string;
  public day!: string;
  public startTime!: string;
  public endTime!: string;
}

Subject.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Day: {
      type: DataTypes.ENUM(
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ),
      allowNull: false,
    },
    StartTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    EndTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize: SequelizeDB,
    modelName: "Subject",
    tableName: "subject",
    timestamps: true,
  }
);

export const SubjectModel = SequelizeDB.models.Subject;