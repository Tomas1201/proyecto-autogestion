import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../../database/sequelize.js";

export class Attendance extends Model {
  public id!: string;
  public registrationId!: string; // Links to Registration (Student+Subject)
  public date!: Date;
  public isPresent!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Attendance.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    registrationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Registration",
        key: "id",
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    isPresent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: SequelizeDB,
    timestamps: true,
    tableName: "Attendance",
  }
);
