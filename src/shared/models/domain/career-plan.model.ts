import { DataTypes, Model, Sequelize } from "sequelize";
import { SequelizeDB } from "../../../database/sequelize.js";

/*
Modelo que representa el plan de carrera, que vincula una carrera con un ciclo electivo.
Cada plan de carrera puede tener múltiples asignaturas y está asociado a un ciclo electivo específico.
*/
export class CareerPlanModel extends Model {
  public id!: string; // UUIDV4
  public carreraId!: number;
  public CicloElectivoId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
  },
  {
    sequelize: SequelizeDB,
    timestamps: true,
    tableName: "CareerPlan", // Nombre de la tabla en la base de datos
  }
);
