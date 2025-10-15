import { SequelizeDB } from "../../database/sequelize.js";

import { DataTypes, Model } from "sequelize";

export class Career extends Model {
  public id!: string; 
  public name!: string;
  public description!: string;
  public duration!: number;
  public qualification!: string;
 
  public  headOfCareerId!: number;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Career.init(
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

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    qualification: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    headOfCareerId: {
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