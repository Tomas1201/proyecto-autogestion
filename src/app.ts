import express from 'express';
import carreraRoutes from './Routers/Carrera.router';

const app = express();
app.use(express.json());

app.use('/carreras', carreraRoutes);

export default app;
