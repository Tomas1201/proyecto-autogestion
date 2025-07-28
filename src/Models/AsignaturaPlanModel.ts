import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from '../Database/Sequelize.js';

export class AsignaturaPlanModel extends Model {
    public id!: number;
    public planCarreraId!: number;
    public asignaturaId!: number;
    public anio!: number;
    public cuatrimestre!: number;
    public cargaHoraria!: number;
    public isoptativa!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AsignaturaPlanModel.init({
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
    modelName: 'AsignaturaPlan',
    tableName: 'AsignaturaPlan',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});