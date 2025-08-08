import express from "express";
import bodyParser from "body-parser";
import { ProfessorCRUDRouter } from "./Features/Professor/ProfessorCRUD/ProfessorCRUDRouter.js";
import { SequelizeDB } from "./Database/Sequelize.js";
import { GeneralRouter } from "./Shared/GeneralRouter.js";

const app = express();
app.use(bodyParser.json());

app.use("/api/v1/professors", GeneralRouter);

app.use(
  (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Global error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
);

SequelizeDB
  .authenticate()
  .then(() => console.log("Database connection established"))
  .catch((error: Error) => console.error("Database connection error:", error));
  
SequelizeDB.sync();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;