import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../Database/Sequelize.js";

export class PuestoAcademicoModel extends Model {
  public id!: number;
  public planCarreraId!: number;
  public asignaturaId!: number;
  public anio!: number;
  public cuatrimestre!: number;
  public CicloElectivoId!: number;
  public profesorId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PuestoAcademicoModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    planCarreraId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "PlanCarrera",
        key: "id",
      },
    },
    asignaturaId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Asignaturas",
        key: "id",
      },
    },
    CicloElectivoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ciclo_electivo",
        key: "id",
      },
    },
    profesorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "professors",
        key: "id",
      },
    },
    cargaHoraria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isOptativa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: SequelizeDB,
    modelName: "PuestoAcademico",
    tableName: "PuestoAcademico",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);
