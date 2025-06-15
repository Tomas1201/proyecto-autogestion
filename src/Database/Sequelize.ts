import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const SequelizeDB = new Sequelize(
    process.env.DB_NAME || 'academic_system',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306', 10),
        dialect: 'mysql',
        logging: false
    }
);

// Verificar conexión
SequelizeDB.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));