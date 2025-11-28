import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../../database/sequelize.js";

export class FinalExam extends Model {
  public id!: number;
  public subjectId!: string;
  public date!: Date;
  public classroom!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

FinalExam.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subjectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Subject",
        key: "id",
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    classroom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: SequelizeDB,
    timestamps: true,
    tableName: "FinalExam",
  }
);
