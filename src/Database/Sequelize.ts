import dotenv from 'dotenv';
import mysql from 'mysql2';
import { Sequelize } from 'sequelize';
dotenv.config();

 export const sequelizeDB = new Sequelize(process.env.DB_NAME || 'carreras', process.env.DB_USER || 'root', process.env.DB_PASSWORD || 'ivo123', {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
    logging: console.log, // Disable logging for cleaner output
     });
     
   //  export async function testConnection(){
         
         /*try{
             
             await sequelizeDB.authenticate();
             
             console.log("Conexión exitosa");
             
            }catch(err){
                
                
                
                console.error("Error de conexión",err);
                
            }
            
            console.error();
            
        }*/
        
        
        //export { sequelize as sequelize };



//export default sequelize;