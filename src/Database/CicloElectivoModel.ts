import {SequelizeDB} from './sequelize.js';
import { DataTypes } from 'sequelize';
SequelizeDB.define('ciclo_electivo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    anio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'activo', // Valores posibles: 'activo', 'inactivo'
    },
}, {
    tableName: 'ciclo_electivo',
    timestamps: true, // Agrega createdAt y updatedAt
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
});
