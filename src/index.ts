import express from 'express';
import dotenv from 'dotenv';
import AlumnoRouter from './Alumno/AlumnoRouter.js';
import { Carrera, CarreraModel } from './Database/CarrerasModel.js';
//import {Normalizador} from './Utils/Sanitizador.js';
import { SequelizeDB } from './Database/Sequelize.js';
import { C_AModel } from './Database/CarreraAsignaturaModel.js'; // Importar el modelo de Carrera/Asignatura si es necesario
import { AsignaturaModel } from './Database/AsignaturaModel.js'; // Importar el modelo de Asignatura si es necesario
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/alumnos', AlumnoRouter); 

AsignaturaModel.belongsToMany(CarreraModel, { through: C_AModel, foreignKey: 'Asignatura_id' });
CarreraModel.belongsToMany(AsignaturaModel, { through: C_AModel, foreignKey: 'Carrera_id' });




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