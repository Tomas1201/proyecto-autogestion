import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../../database/sequelize.js";

export class FinalExam extends Model {
    public id!: number;
    public subjectId!: number; // Final exams are usually per subject, not per class instance (AcademicPosition)
    public date!: Date;
    public professorId!: number;
    public classroom!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

FinalExam.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        subjectId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "Subject",
                key: "id",
            },
        },
        professorId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "Professor",
                key: "id",
            },
        },
        date: {
            type: DataTypes.DATE, // Includes time
            allowNull: false,
        },
        classroom: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: SequelizeDB,
        timestamps: true,
        tableName: "FinalExam",
    }
);
