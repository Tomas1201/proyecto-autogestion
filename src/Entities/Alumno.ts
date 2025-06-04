import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('');
// Define the Alumno model
export const Alumno = sequelize.define('Alumno', {
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
    fechaNacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    }, {
    tableName: 'alumnos',
    timestamps: false, // Disable createdAt and updatedAt fields
    });