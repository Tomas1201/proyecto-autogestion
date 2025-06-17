import { SequelizeDB } from "./Sequelize.js";
import { DataTypes, Model } from "sequelize";


class Inscriptos extends Model {}

SequelizeDB.define('inscriptos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Alumno_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'alumnos',
            key: 'id'
        }
    },
    Carrera_id: {
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
    asignatura_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'asignaturas',
            key: 'id'
        }
    }
    },{
    tableName: 'inscriptos',
    timestamps: false,
      
    });
SequelizeDB.sync()
// Exportar el modelo
export const InscriptosModel = SequelizeDB.models.inscriptos;