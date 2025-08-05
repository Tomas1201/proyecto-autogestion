import { DataTypes, Model, Sequelize } from "sequelize";
import { SequelizeDB } from '../../../Database/Sequelize.js';

/*
Modelo que representa el plan de carrera, que vincula una carrera con un ciclo electivo.
Cada plan de carrera puede tener múltiples asignaturas y está asociado a un ciclo electivo específico.
*/
export class CareerPlanModel extends Model {
    public id!: string; // UUIDV4
    public carreraId!: number;
    public CicloElectivoId!: number;
    

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

CareerPlanModel.init( {
    id: {
       type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,
    },
    carreraId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Carreras', 
            key: 'id' 
    }
},
    CicloElectivoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ciclo_electivo', 
            key: 'id' 
        }
    },
}, {
    sequelize: SequelizeDB,
    timestamps: true, 
});

