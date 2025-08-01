import { SequelizeDB } from "../../Database/Sequelize.js";
import { DataTypes, Model } from "sequelize";


export class Inscriptos extends Model {
    public id!: string; // UUIDV4
    public alumno_id!: number;
    public fecha_inscripcion!: Date;
    public puestoacademico_id!: number;
    

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Inscriptos.init({
    id: {
        type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,
    },
    alumno_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Alumnos',
            key: 'id'
        }
    },
     puestoacademico_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'PuestoAcademico',
            key: 'id'
        }
    }
    },{
    sequelize: SequelizeDB,
    tableName: 'inscriptos',
    timestamps: false,
      
    });
