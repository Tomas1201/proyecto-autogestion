import { SequelizeDB } from "../../Database/Sequelize.js";
import { DataTypes, Model } from "sequelize";


export class Registration extends Model {
    public id!: string; // UUIDV4
    public StudentId!: number;
    public AcademicPositionId!: number;
    

    // timestamps!
    public readonly CreatedAt!: Date;
    public readonly UpdatedAt!: Date;
}

Registration.init({
    Id: {
        type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,
    },
    StudentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Student',
            key: 'Id'
        }
    },
     AcademicPositionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'AcademicPosition',
            key: 'Id'
        }
    }
    },{
    sequelize: SequelizeDB,
    timestamps: true,
    });
