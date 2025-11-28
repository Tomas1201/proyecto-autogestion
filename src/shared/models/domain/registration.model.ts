import { SequelizeDB } from "../../../database/sequelize.js";
import { DataTypes, Model } from "sequelize";

export class Registration extends Model {
  public id!: string; // UUIDV4
  public studentId!: number;
  public academicPositionId!: number;
  public status!: string;

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
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Student",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM('ENROLLED', 'PASSED', 'FAILED'),
      allowNull: false,
      defaultValue: 'ENROLLED',
    },
  },
  {
    sequelize: SequelizeDB,
    timestamps: true,
    tableName: "Registration", // Nombre de la tabla en la base de datos
  }
);
