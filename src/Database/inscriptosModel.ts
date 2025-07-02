import { SequelizeDB } from "./Sequelize.js";
import { DataTypes, Model } from "sequelize";


class Inscriptos extends Model {}

SequelizeDB.define('inscriptos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    alumno_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'alumnos',
            key: 'id'
        }
    },
     asignatura_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'asignaturas',
            key: 'id'
        }
    },
    carrera_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'carreras',
            key: 'id'
        }
    },
    fecha_inscripcion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
   
    },{
    tableName: 'inscriptos',
    timestamps: false,
      
    });
SequelizeDB.sync()
// Exportar el modelo
export const InscriptosModel = SequelizeDB.models.inscriptos;