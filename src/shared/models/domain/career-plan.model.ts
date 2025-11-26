import { DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { SequelizeDB } from "../../../database/sequelize.js";

export class CareerPlanModel extends Model<InferAttributes<CareerPlanModel>, InferCreationAttributes<CareerPlanModel>> {
  declare id: CreationOptional<string>;
  declare careerId: string;
  declare cycleElectiveId: number;

  // timestamps!
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

CareerPlanModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    careerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Career",
        key: "id",
      },
    },
    cycleElectiveId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "CycleElective",
        key: "id",
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: SequelizeDB,
    timestamps: true,
    tableName: "CareerPlan", // Nombre de la tabla en la base de datos
  }
);
