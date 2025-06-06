import { SequelizeDB } from '../Database/Sequelize.js';

import { DataTypes, Model } from 'sequelize';

SequelizeDB.define('Carrera', {
    id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    duracion:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    titulo:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    asignaturas_id:{
        type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    JefeCarrera_id:{
        type: DataTypes.INTEGER
    }
});