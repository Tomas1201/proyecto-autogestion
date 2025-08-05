import {SequelizeDB} from '../../../Database/Sequelize.js';
import { DataTypes, Model } from 'sequelize';


export class CicloElectivoModel extends Model {
    public id!: number;
    public anio!: number;
    public fecha_inicio!: Date;
    public fecha_fin!: Date;
    public estado!: string;
    public cuatrimestre!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

CicloElectivoModel.init({
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
    cuatrimestre: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize: SequelizeDB,
    modelName: 'CicloElectivo',
    tableName: 'ciclo_electivo',
    timestamps: true, // Agrega createdAt y updatedAt
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
});


