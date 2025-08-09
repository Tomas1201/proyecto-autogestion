import { SequelizeDB } from "../../Database/Sequelize.js";

import { DataTypes, Model } from "sequelize";

export class Career extends Model {
  public Id!: string; // UUIDV4
  public Name!: string;
  public Description!: string;
  public Duration!: number;
  public Qualification!: string;
 // public SubjectId!: number[];
  public  HeadOfCareerId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Career.init(
  {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    Qualification: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    HeadOfCareerId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: SequelizeDB,
    timestamps: true, // Agrega createdAt y updatedAt
    tableName: "Career", // Nombre de la tabla en la base de datos
  }
);

export const CareerModel = SequelizeDB.models.Career;