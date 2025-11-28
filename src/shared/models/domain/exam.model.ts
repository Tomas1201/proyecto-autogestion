import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../../database/sequelize.js";

export class Exam extends Model {
    public id!: number;
    public academicPositionId!: number;
    public date!: Date;
    public description!: string;
    public type!: string; // 'partial', 'final' (though final might be separate model if logic differs)

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Exam.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('partial', 'final'),
            allowNull: false,
            defaultValue: 'partial'
        }
    },
    {
        sequelize: SequelizeDB,
        timestamps: true,
        tableName: "Exam",
    }
);
