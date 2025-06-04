import { DataTypes } from 'sequelize';
import { SequelizeDB } from '../Database/Sequelize';

const sequelize = SequelizeDB;

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
export const AlumnoModel = sequelize.models.Alumno;

