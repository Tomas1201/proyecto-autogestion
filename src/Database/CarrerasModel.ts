import { DataTypes } from 'sequelize';
import { SequelizeDB } from '../Database/Sequelize.js';

SequelizeDB.define('Carrera_asignatura', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Carrera_id: {
        type: DataTypes.INTEGER
    },
    Asignatura_id: {
        type: DataTypes.INTEGER,
    },
    Professor_id: {
        type: DataTypes.INTEGER
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    EvalGlob_id: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'Carrera_asignatura',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
});

SequelizeDB.sync();
export const C_AModel = SequelizeDB.models.Carrera_asignatura;