import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../../database/sequelize.js";

export class Attendance extends Model {
    public id!: number;
    public studentId!: number;
    public academicPositionId!: number;
    public date!: Date;
    public isPresent!: boolean;
    public observations!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Attendance.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        studentId: {
            type: DataTypes.UUID, // Assuming Student ID is UUID based on other models
            allowNull: false,
            references: {
                model: "Student",
                key: "id",
            },
        },
        academicPositionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "AcademicPosition",
                key: "id",
            },
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        isPresent: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        observations: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: SequelizeDB,
        timestamps: true,
        tableName: "Attendance",
    }
);
