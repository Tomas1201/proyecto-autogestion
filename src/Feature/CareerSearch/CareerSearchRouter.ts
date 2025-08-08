import { Router } from "express";
import { CareerController } from "./CareerSearchController.js";
const CareerSearchRouter = Router();

CareerSearchRouter.use("/name/:name", CareerController.getByName)

export default CareerSearchRouter;