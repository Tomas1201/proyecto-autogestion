import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from '../Database/Sequelize.js';

export class PuestoAcademicoModel extends Model {
    public id!: number;
    public planCarreraId!: number;
    public asignaturaId!: number;
    public anio!: number;
    public cuatrimestre!: number;
    public CicloElectivoId!: number;
    public profesorId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PuestoAcademicoModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    planCarreraId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'PlanCarrera', // Nombre de la tabla referenciada
            key: 'id' // Clave primaria de la tabla referenciada
        }
    },
    asignaturaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Asignaturas', // Nombre de la tabla referenciada
            key: 'id' // Clave primaria de la tabla referenciada    
        }
    },
    CicloElectivoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ciclo_electivo', // Nombre de la tabla referenciada
            key: 'id' // Clave primaria de la tabla referenciada
        }
    },
    profesorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'professors', // Nombre de la tabla referenciada
            key: 'id' // Clave primaria de la tabla referenciada
        }
    },
    cargaHoraria: {
        type: DataTypes.INTEGER,
        allowNull: false,  
    },
    isoptativa: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }

}, {
    sequelize: SequelizeDB,
    modelName: 'PuestoAcademico',
    tableName: 'PuestoAcademico',
    timestamps: true, // Agrega createdAt y updatedAt
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
});