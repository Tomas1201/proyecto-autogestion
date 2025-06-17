import { DataTypes, Model } from 'sequelize';
import { SequelizeDB } from './Sequelize.js';

   SequelizeDB.define('Asignatura',{
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

},{
    tableName: 'Asignaturas',
    timestamps: true, // Agrega createdAt y updatedAt
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
}

);
SequelizeDB.sync();
export const AsignaturaModel = SequelizeDB.models.Asignatura;