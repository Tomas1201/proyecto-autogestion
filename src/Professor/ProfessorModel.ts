import { DataTypes, Model } from 'sequelize';
import { SequelizeDB } from '../Database/Sequelize.js';

export class Professor extends Model {
    public id!: number;
    public nombre!: string;
    public apellido!: string;
    public email!: string;
    public legajo!: number;
    public dni!: string;
    public telefono!: string;
    public titulo!: string;
    public disponibilidad_horaria!: JSON;
    public estado!: 'activo' | 'inactivo';
}

SequelizeDB.define('Professor', {
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
        validate: { isEmail: true }
    },
    legajo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    dni: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    disponibilidad_horaria: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        defaultValue: 'activo'
    },
}, {
    tableName: 'Professors',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
});

SequelizeDB.sync();
export const ProfessorModel = SequelizeDB.models.Professor;