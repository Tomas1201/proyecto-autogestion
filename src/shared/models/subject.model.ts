import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../database/sequelize.js";

export class Subject extends Model {
  public id!: string;
  public name!: string;
  public code!: string;
  public hours!: number; // puede ser nulo
  public horariosId!: number; // puede ser nulo
  public classroom!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Subject.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hours: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    horariosid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    classroom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: SequelizeDB,
    timestamps: true,
    tableName: "Subject",
  }
);

export const SubjectModel = SequelizeDB.models.Subject;
