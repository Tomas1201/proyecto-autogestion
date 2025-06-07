import { DataTypes, Model } from 'sequelize';
import { SequelizeDB } from '../Database/Sequelize.js';

SequelizeDB.define('Carrera/asignatura',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    carrera_id:{
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