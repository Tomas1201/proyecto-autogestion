import { SequelizeDB } from "../../../database/sequelize.js";
import { DataTypes, Model } from "sequelize";

export class Registration extends Model {
  public id!: string; // UUIDV4
  public StudentId!: number;
  public AcademicPositionId!: number;

  // timestamps!
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

Registration.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    academicPositionId: {
      type: DataTypes.INTEGER,
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
    tableName: "Registration", // Nombre de la tabla en la base de datos
  }
);
