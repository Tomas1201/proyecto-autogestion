import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../Database/Sequelize.js";

export class Horario extends Model {
  public id!: string; // UUIDV4
  public dia!: string;
  public hora_inicio!: string;
  public hora_fin!: string;
  public aula!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Horario.init(
  {
    id: {
      type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,
    },
    dia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hora_inicio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hora_fin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aula: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: SequelizeDB,
    modelName: "Horario",
    tableName: "horarios",
    timestamps: true, // Agrega createdAt y updatedAt
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion",
  }
);