import a from './Shared/Relaciones.js'; // Importar las relaciones
import express from "express";
import GeneralRouter from "./Features/GeneralRouter.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* TO DO: See Zod Schema in realtion of Career Model and Router to create Career 

Changes: Correction in GeneralRouter.
Delte public SubjectId!: number[] in CarerModel.0ts

*/

app.use('/api/v1/students', GeneralRouter); 


app.use("/api/v1/Career", GeneralRouter);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
