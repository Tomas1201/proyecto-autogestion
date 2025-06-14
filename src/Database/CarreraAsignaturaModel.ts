import { DataTypes, Model } from 'sequelize';
import { SequelizeDB } from '../Database/Sequelize.js';

 SequelizeDB.define('Carrera_asignatura',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Carrera_id:{
        type: DataTypes.INTEGER
    },
    Asignatura_id:{
        type: DataTypes.INTEGER,
    },
    Alumno_id:{
        type: DataTypes.INTEGER
    },
    EvalGlob_id:{
        type: DataTypes.INTEGER
    }

});
SequelizeDB.sync();
export const C_AModel = SequelizeDB.models.Carrera_asignatura;