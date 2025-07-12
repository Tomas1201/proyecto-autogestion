import { SequelizeDB } from '../Database/Sequelize.js';

import { DataTypes, Model } from 'sequelize';



export class Carrera extends Model {
    public id!: number;
    public nombre!: string;
    public descripcion!: string;
    public duracion!: number;
    public titulo!: string;
    public asignaturas_id!: number[];
    public JefeCarrera_id!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}
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
    
    
    
    JefeCarrera_id:{
        type: DataTypes.INTEGER
    },
    
},{
    tableName: 'Carreras',
    timestamps: true, // Agrega createdAt y updatedAt
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
});


SequelizeDB.sync( );

export const CarreraModel = SequelizeDB.models.Carrera;