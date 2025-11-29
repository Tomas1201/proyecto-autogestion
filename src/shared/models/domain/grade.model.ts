import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../../database/sequelize.js";

export class Grade extends Model {
    public id!: string;
    public studentId!: string;
    public examId!: string;
    public value!: number;
    public feedback!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Grade.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
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
            type: DataTypes.UUID,
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
