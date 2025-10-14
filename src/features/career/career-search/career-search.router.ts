import { Router } from "express";
import { CareerController } from "./career-search.controller.js";
const CareerSearchRouter = Router();

CareerSearchRouter.use("/name/:name", CareerController.getByName)

export default CareerSearchRouter;