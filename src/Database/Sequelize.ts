import dotenv from 'dotenv';
import mysql from 'mysql2';
import { Sequelize } from 'sequelize';
dotenv.config();

export const sequelize = new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD || '', {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
    logging: false, // Disable logging for cleaner output
     });


async function testConnection(){

try{

 await sequelize.authenticate();

console.log("Cnexión exitosa");

}catch(err){



 console.error("Error de conexión",err);

}
    
    console.error();

}

testConnection();



//export default sequelize;

    