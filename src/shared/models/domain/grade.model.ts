import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../../database/sequelize.js";

export class Grade extends Model {
    public id!: number;
    public studentId!: number;
    public examId!: number;
    public value!: number;
    public feedback!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Grade.init(
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
        examId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Exam",
                key: "id",
            },
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        feedback: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: SequelizeDB,
        timestamps: true,
        tableName: "Grade",
    }
);
