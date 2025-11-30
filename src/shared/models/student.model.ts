import { DataTypes, Model } from "sequelize";
import { SequelizeDB } from "../../database/sequelize.js";

export class Student extends Model {
  public id!: string;
  public name!: string;
  public lastName!: string;
  public email!: string;
  public file!: number;
  public status!: string;
  public dni!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Student.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    file: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM("activo", "inactivo", "graduado"),
      allowNull: false,
      defaultValue: "activo",
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: SequelizeDB,
    timestamps: true,
    tableName: "Student", 
    hooks: {
      afterCreate: async (student: Student) => {
        try {
          const { User } = SequelizeDB.models;
          
          
          
          
          
          const { hashPassword } = await import('../../features/auth/hashing-auth.service.js');

          if (User) {
            const hashedPassword = await hashPassword(student.dni.toString());
            await User.create({
              file: student.file.toString(),
              password: hashedPassword,
              role: 'STUDENT',
              entityId: student.id,
            });
            console.log(`User created for student ${student.file}`);
          } else {
            console.error('User model not found in SequelizeDB models');
          }
        } catch (error) {
          console.error('Error creating user for student:', error);
        }
      }
    }
  }
);
