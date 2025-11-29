import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../../database/sequelize.js";

export class FinalExamRegistration extends Model {
    public id!: number;
    public studentId!: string;
    public finalExamId!: number;
    public grade!: number;
    public state!: string; // 'registered', 'passed', 'failed', 'absent'
    public feedback!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

FinalExamRegistration.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        studentId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "Student",
                key: "id",
            },
        },
        finalExamId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "FinalExam",
                key: "id",
            },
        },
        grade: {
            type: DataTypes.FLOAT,
            allowNull: true, // Null until graded
        },
        state: {
            type: DataTypes.ENUM('registered', 'passed', 'failed', 'absent'),
            allowNull: false,
            defaultValue: 'registered',
        },
        feedback: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: SequelizeDB,
        timestamps: true,
        tableName: "FinalExamRegistration",
    }
);
