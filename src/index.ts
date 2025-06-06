import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import AlumnoRouter from './Routers/AlumnoRouter.js';
import {Normalizador} from './Utils/Sanitizador.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/alumnos', AlumnoRouter); 





app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});