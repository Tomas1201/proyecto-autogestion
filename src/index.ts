
import dotenv from 'dotenv';

import a from './Shared/Relaciones.js'; // Importar las relaciones
dotenv.config();
import express from "express";
//import { SequelizeDB } from "./Database/Sequelize.js";
import ExportRetionship from "./Shared/ExportRelationship.js";
import GeneralRouter from "./Feature/GeneralRouter.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

a;
app.use('/api/v1/students', GeneralRouter); 


ExportRetionship;
app.use("/Career", GeneralRouter);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
