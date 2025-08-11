import a from './Shared/Relaciones.js'; // Importar las relaciones
import express from "express";
import GeneralRouter from "./Features/GeneralRouter.js"
import CareerRouter from './Features/CareerCRUD/CareerRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/', GeneralRouter); 
app.use('/Career', CareerRouter); // Ensure the path is correct





app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
