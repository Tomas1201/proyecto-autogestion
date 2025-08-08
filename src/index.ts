import express from 'express';
import dotenv from 'dotenv';
import {GeneralRouter} from './Features/GeneralRouter.js';


import { SequelizeDB } from './Database/Sequelize.js';
import a from './Shared/Relaciones.js'; // Importar las relaciones
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

a;
app.use('/api/v1/students', GeneralRouter); 


SequelizeDB.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  }
  );



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});