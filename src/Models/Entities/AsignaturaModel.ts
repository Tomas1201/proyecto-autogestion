import { DataTypes, Model } from 'sequelize';
import { SequelizeDB } from '../../Database/Sequelize.js';

export class Asignatura extends Model {
    public id!: string; // UUIDV4
    public nombre!: string;
  public codigo!: string;
  public horas!: number;
  public horariosid!: number; // ID de Horario
  public aula!: string;
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


   Asignatura.init({
    id:{
       type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    codigo:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    horas:{
        type: DataTypes.INTEGER,
    },
    horariosid:{
        type: DataTypes.INTEGER,
    },
    aula:{
        type: DataTypes.STRING,
    },

},{
    sequelize: SequelizeDB,
    tableName: 'Asignaturas',
    timestamps: true, // Agrega createdAt y updatedAt
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
}

);
