import dotenv from 'dotenv';
import { Sequelize, Op } from 'sequelize';

dotenv.config();

// Creacion de la conexion a la base de datos MySQL utilizando Sequelize
export const SequelizeDB = new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD || '', {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
    logging: console.log, // Disable logging for cleaner output
     });

     





