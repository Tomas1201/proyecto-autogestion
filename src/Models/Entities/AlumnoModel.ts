import { DataTypes, Model } from 'sequelize';
import { SequelizeDB } from '../../Database/Sequelize.js';


export class Alumno extends Model {
    public id!: number;
    public nombre!: string;
    public apellido!: string;
    public email!: string;
    public legajo!: number;
    public status!: string;
    public dni!: number;
    public carrera!: string[];
    

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

Alumno.init({
   id: {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,
},
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    legajo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    status: {
        type: DataTypes.ENUM('activo', 'inactivo', 'graduado'),
        allowNull: false,
        defaultValue: 'activo',
    },
    dni: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    carrera: {
        type: DataTypes.STRING,
        allowNull: true,   
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize: SequelizeDB,
    tableName: 'Alumnos',
    timestamps: true,
});



