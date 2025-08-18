import { DataTypes, Model } from 'sequelize';
import { SequelizeDB } from '../../Database/Sequelize.js';

export class Planning extends Model {
    public Id!: string; // UUIDV4
    public Objective!: string;
    //public Code!: string;
    public ProfessionalProfile!: string;
    public DegreeScope!: string; // ID de Horario
    //public Classroom!: string;
    // timestamps!
     public SubjectId!: string
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


   Planning.init({
    Id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    Objective:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    ProfessionalProfile:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    DegreeScope:{
        type: DataTypes.STRING,
        allowNull: false,
    },SubjectId: {
        type: DataTypes.UUID,
        allowNull: false, 
        references: {
            model: 'Subject', 
            key: 'Id',
        },
    },
    // Code:{
    

},{
    sequelize: SequelizeDB,
    timestamps: true, // Agrega createdAt y updatedAt
    tableName: 'Planning', // Nombre de la tabla en la base de datos
});

export const PlanningModel = SequelizeDB.models.Planning;