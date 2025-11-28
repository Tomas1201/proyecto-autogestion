import { DataTypes, Model } from 'sequelize';
import { SequelizeDB } from '../../database/sequelize.js';

export class User extends Model {
    public id!: string;
    public file!: string;
    public password!: string;
    public role!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    file: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('ADMIN', 'PROFESSOR', 'STUDENT'),
        allowNull: false
    }
},
    {
    sequelize: SequelizeDB,
    timestamps: true, 
    tableName: "User", 
  }

);

export const UserModel = SequelizeDB.models.User;