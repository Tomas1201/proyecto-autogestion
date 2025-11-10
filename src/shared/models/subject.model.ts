import { DataTypes, Model } from 'sequelize';
import { SequelizeDB } from '../../database/sequelize.js';

export class Subject extends Model {
    public Id!: string; // UUIDV4
    public Name!: string;
    public Code!: string;
    public Hours!: number;
    public horariosId!: number; // ID de Horario
    public Classroom!: string;
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
    },
    horariosid:{
        type: DataTypes.INTEGER,
    },
    classroom:{
        type: DataTypes.STRING,
    },

},{
    sequelize: SequelizeDB,
    timestamps: true, // Agrega createdAt y updatedAt
    tableName: 'Subject', // Nombre de la tabla en la base de datos
});

export const SubjectModel = SequelizeDB.models.Subject;