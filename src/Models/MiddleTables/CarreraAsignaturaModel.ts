import { DataTypes, Model } from 'sequelize';
import { SequelizeDB } from '../../Database/Sequelize.js';

 SequelizeDB.define('Carrera_asignatura',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    carrera_id:{
        type: DataTypes.INTEGER,
        references: {
            model: 'Carrera', // Nombre de la tabla referenciada
            key: 'id' // Clave primaria de la tabla referenciada
        }
    },
    asignatura_id:{
        type: DataTypes.INTEGER,
        references: {
            model: 'Asignatura', // Nombre de la tabla referenciada
            key: 'id' // Clave primaria de la tabla referenciada
        }
    },
    alumno_id:{
        type: DataTypes.INTEGER
    },
    evalGlob_id:{
        type: DataTypes.INTEGER
    }

});

export const C_AModel = SequelizeDB.models.Carrera_asignatura;