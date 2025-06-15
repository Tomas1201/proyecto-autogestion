import { DataTypes } from 'sequelize';
import { SequelizeDB } from './Sequelize.js';

SequelizeDB.define('Asignatura', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    horas: {
        type: DataTypes.INTEGER,
    },
    horarios: {
        type: DataTypes.JSON, // Cambiado a JSON
    },
    aula: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'Asignaturas',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
});

SequelizeDB.sync();
export const AsignaturaModel = SequelizeDB.models.Asignatura;