import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('');
// Define the Alumno model
export const Carrera = sequelize.define('Carrera', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cant_alumno: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    duracion: {
        type: DataTypes.CHAR,/**NO SE PUEDE USAR VARCHAR? */
        allowNull: false,
    },
    }, {
    tableName: 'carrera',
    timestamps: false, // Disable createdAt and updatedAt fields
    });