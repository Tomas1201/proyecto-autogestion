import { DataTypes, Model } from 'sequelize';
import { SequelizeDB } from '../Database/Sequelize.js';





export class Alumno extends Model {
    public id!: number;
    public nombre!: string;
    public apellido!: string;
    public email!: string;
    public legajo!: number;
    public status!: string;
    

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

SequelizeDB.define('Alumno', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'activo',
    },
    dni: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'Alumnos',
    timestamps: false, // Disable createdAt and updatedAt fields
});
SequelizeDB.sync();
export const AlumnoModel = SequelizeDB.models.Alumno;

