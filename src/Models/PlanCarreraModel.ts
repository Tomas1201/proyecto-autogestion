import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from '../Database/Sequelize.js';

/*
Modelo que representa el plan de carrera, que vincula una carrera con un ciclo electivo.
Cada plan de carrera puede tener múltiples asignaturas y está asociado a un ciclo electivo específico.
*/
export class PlanCarreraModel extends Model {
    public id!: string; // UUIDV4
    public carreraId!: number;
    public CicloElectivoId!: number;


    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

SequelizeDB.define('PlanCarrera', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        autoIncrement: true,
    },
    carreraId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Carreras', // Nombre de la tabla referenciada
            key: 'id' // Clave primaria de la tabla referenciada
    }
},
    CicloElectivoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ciclo_electivo', // Modelo referenciado
            key: 'id' // Clave primaria del modelo referenciado
        }
    },
}, {
    tableName: 'PlanCarrera',
    timestamps: true, // Agrega createdAt y updatedAt
});

