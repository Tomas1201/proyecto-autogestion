import { SequelizeDB } from "../../database/sequelize.js";

import { DataTypes, Model } from "sequelize";

export class Career extends Model {
  public Id!: string; 
  public Name!: string;
  public Description!: string;
  public Duration!: number;
  public Qualification!: string;
 
  public  HeadOfCareerId!: number;


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
      allowNull:true,
    },
  },
  {
    sequelize: SequelizeDB,
    timestamps: true, 
    tableName: "Career", 
  }
);

export const CareerModel = SequelizeDB.models.Career;