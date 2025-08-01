import express from "express";
import bodyParser from "body-parser";
import { P } from "./Professor/ProfessorRouter.js";
import confirmacionRouter from "./Routers/ConfirmationRouter.js";
import { ProfessorAsignatura } from "./Database/ProfessorAsignaturaModel";
import { sequelizedb } from "./Database/Sequelize.js";

const app = express();
app.use(bodyParser.json());

app.use("/api/v1/professors", P);
app.use("/api/v1/confirm", confirmacionRouter);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Global error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
);

sequelizedb
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((error: Error) => {
    console.error("Unable to connect to the database:", error);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
export { app };
