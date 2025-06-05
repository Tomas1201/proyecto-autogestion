import { DataTypes, Model } from 'sequelize';
import { SequelizeDB } from '../Database/Sequelize.js';

const sequelize = SequelizeDB;


export class Alumno extends Model {
    public id!: number;
    public nombre!: string;
    public apellido!: string;
    public email!: string;
    public legajo!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

sequelize.define('Alumno', {
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
}, {
    tableName: 'Alumnos',
    timestamps: false, // Disable createdAt and updatedAt fields
});
sequelize.sync();
export const AlumnoModel = sequelize.models.Alumno;

