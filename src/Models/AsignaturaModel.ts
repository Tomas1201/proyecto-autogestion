import { DataTypes, Model } from 'sequelize';
import { SequelizeDB } from '../Database/Sequelize.js';

SequelizeDB.define('asignatura',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    codigo:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    horas:{
        type: DataTypes.INTEGER,
    },
    horarios:{
        type: DataTypes.DATE,
    },
    aula:{
        type: DataTypes.STRING,
    },

}

);