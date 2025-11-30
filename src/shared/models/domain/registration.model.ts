import { SequelizeDB } from "../../../database/sequelize.js";
import { DataTypes, Model } from "sequelize";

export class Registration extends Model {
  public id!: string; 
  public studentId!: string;
  public academicPositionId!: string;
  public status!: string;
  public grade!: number | null;

  
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
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "AcademicPosition",
        key: "id",
      },
    },
    studentId: {
      type: DataTypes.UUID,
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
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: SequelizeDB,
    timestamps: true,
    tableName: "Registration", 
  }
);
