import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

// Creacion de la conexion a la base de datos MySQL utilizando Sequelize
export const SequelizeDB = new Sequelize(process.env.DB_NAME || 'mydatabase', process.env.DB_USER || 'user', process.env.DB_PASSWORD || 'mypassword', {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
    logging: console.log, // Disable logging for cleaner output
     });

     





