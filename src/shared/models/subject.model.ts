import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../database/sequelize.js";

export class Subject extends Model {
  public Id!: string;
  public Name!: string;
  public Code!: string;
  public Hours!: number;
  public horariosId!: number;
  public Classroom!: string;
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
    },
    horariosid: {
      type: DataTypes.INTEGER,
    },
    classroom: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: SequelizeDB,
    timestamps: true,
    tableName: "Subject",
  }
);

export const SubjectModel = SequelizeDB.models.Subject;
