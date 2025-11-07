import { DataTypes, Model } from 'sequelize';
import { SequelizeDB } from '../../database/sequelize.js';

export class User extends Model {
    public id!: string;
    public email!: string;
    public password_hash!: string;
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
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
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