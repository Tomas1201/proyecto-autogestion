import { DataTypes, Model } from "sequelize";
import { sequelizedb } from "../../Database/Sequelize.js";

export class Subject extends Model {
  public id!: number;
  public name!: string;
  public day!: string;
  public startTime!: string;
  public endTime!: string;
}

Subject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    day: {
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
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizedb,
    modelName: "Subject",
    tableName: "subjects",
    timestamps: true,
  }
);

export const SubjectModel = sequelizedb.models.Subject;