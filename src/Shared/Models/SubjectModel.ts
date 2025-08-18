import { DataTypes, Model } from 'sequelize';
import { SequelizeDB } from '../../Database/Sequelize.js';

export class Subject extends Model {
    public Id!: string; // UUIDV4
    public Name!: string;
   
    public HoursLectures!: number;
    public ScheduleId!: number; 
    
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
    HoursLectures:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
    

},{
    sequelize: SequelizeDB,
    timestamps: true, 
    tableName: 'Subject', 
});

export const SubjectModel = SequelizeDB.models.Subject;