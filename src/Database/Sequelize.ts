import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

 export const sequelizeDB = new Sequelize(process.env.DB_NAME || 'carreras', process.env.DB_USER || 'root', process.env.DB_PASSWORD || 'ivo123', {
    host: process.env.DB_HOST || 'postgres',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
    logging: console.log,
     });
  