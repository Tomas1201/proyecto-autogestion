import { DataTypes, Model, Sequelize } from 'sequelize';
import { SequelizeDB } from '../../database/sequelize.js';

export class Professor extends Model {
  public id!: string; // UUIDV4
  public name!: string;
  public lastName!: string;
  public dni!: string;
  public file!: string;
  public academicTitle!: string;
  public email!: string;
  public phone!: string;
  public scheduleAvailability!: string;
  public state!: boolean; // puede ser nulo

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Professor.init({
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
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  file: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  academicTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  scheduleAvailability: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  },

}, {
  sequelize: SequelizeDB,
  timestamps: true,
  tableName: 'Professor',
  hooks: {
    afterCreate: async (professor: Professor) => {
      try {
        const { User } = SequelizeDB.models;
        const { hashPassword } = await import('../../features/auth/hashing-auth.service.js');

        if (User) {
          const hashedPassword = await hashPassword(professor.dni);
          await User.create({
            file: professor.file,
            password: hashedPassword,
            role: 'PROFESSOR',
          });
          console.log(`User created for professor ${professor.file}`);
        } else {
          console.error('User model not found in SequelizeDB models');
        }
      } catch (error) {
        console.error('Error creating user for professor:', error);
      }
    }
  }
});

export const ProfessorModel = SequelizeDB.models.Professor;