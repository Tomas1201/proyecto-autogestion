import { DataTypes, Model } from 'sequelize';
import { SequelizeDB } from '../../Database/Sequelize.js';

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
    Id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    Name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Code:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Hours:{
        type: DataTypes.INTEGER,
    },
    horariosid:{
        type: DataTypes.INTEGER,
    },
    Classroom:{
        type: DataTypes.STRING,
    },

},{
    sequelize: SequelizeDB,
    timestamps: true, // Agrega createdAt y updatedAt
    tableName: 'Subject', // Nombre de la tabla en la base de datos
});

export const SubjectModel = SequelizeDB.models.Subject;