import { SequelizeDB } from '../../Database/Sequelize.js';

import { DataTypes, Model } from 'sequelize';



export class Carrera extends Model {
    public id!: string; // UUIDV4
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
Carrera.init({
    
    id:{
    type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,
    
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
    sequelize: SequelizeDB,
    tableName: 'Carreras',
    timestamps: true, // Agrega createdAt y updatedAt
});

