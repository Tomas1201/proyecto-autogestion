import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const SequelizeDB = new Sequelize(
  process.env.DB_NAME || 'mydatabase',
  process.env.DB_USER || 'myuser',
  process.env.DB_PASSWORD || 'mypassword',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    dialect: 'postgres',
    logging: console.log, // Disable logging for cleaner output
     });

//SOY un GATO Miiiiiiiiiiiiiaaaaaaaaaaaaaauuuuuuuuuuuuu





