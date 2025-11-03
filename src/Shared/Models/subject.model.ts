import { DataTypes, Model } from 'sequelize';
import { SequelizeDB } from '../../Database/Sequelize.js';

export class Subject extends Model {
    public id!: string; // UUIDV4
    public name!: string;
    public code!: string;
    public hours!: number;
    public scheduleId!: number; // ID de Horario
    public classroom!: string;
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


   Subject.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    code:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    hours:{
        type: DataTypes.INTEGER,
    },/*
    scheduleId:{
        type: DataTypes.INTEGER,
    },*/
    classroom:{
        type: DataTypes.STRING,
    },

},{
    sequelize: SequelizeDB,
    timestamps: true, // Agrega createdAt y updatedAt
    tableName: 'Subject', // Nombre de la tabla en la base de datos
});

export const SubjectModel = SequelizeDB.models.Subject;