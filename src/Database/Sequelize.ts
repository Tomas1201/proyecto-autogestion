import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const SequelizeDB = new Sequelize(
  process.env.DB_NAME || 'pepe',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'contraseña',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    dialect: 'postgres',
    logging: console.log, 
     });







