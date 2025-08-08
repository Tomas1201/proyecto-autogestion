import { DataTypes, Model } from 'sequelize';
import { SequelizeDB } from '../../Database/Sequelize.js';


export class Student extends Model {
    public id!: number;
    public name!: string;
    public LastName!: string;
    public Email!: string;
    public legajo!: number;
    public status!: string;
    public dni!: number;
    public Career!: string[];
    

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

Student.init({
   Id: {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,
},
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    File: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    Status: {
        type: DataTypes.ENUM('activo', 'inactivo', 'graduado'),
        allowNull: false,
        defaultValue: 'activo',
    },
    Dni: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    Career: {
        type: DataTypes.STRING,
        allowNull: true,   
    }
    }, {
    sequelize: SequelizeDB,
    timestamps: true,
    tableName: 'Student', // Nombre de la tabla en la base de datos
});