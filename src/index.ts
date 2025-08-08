import express from "express";
import { sequelizeDB } from "./Database/Sequelize.js";
import ExportRetionship from "./Shared/ExportRelationship.js";
import GeneralRouter from "./Feature/GeneralRouter.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
ExportRetionship;
app.use("/Career", GeneralRouter);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
