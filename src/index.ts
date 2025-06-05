import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import AlumnoRouter from './Routers/AlumnoRouter.js'; // Adjust the path as necessary
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/alumnos', AlumnoRouter); // Use the AlumnoRouter for /alumnos endpoint

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Muestra el stack del error en la consola
  res.status(500).send('¡Algo salió mal!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});