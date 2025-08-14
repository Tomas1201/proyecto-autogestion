import { Router } from "express";
import { CareerController } from "./CareerSearchController.js";
const CareerSearchRouter = Router();

CareerSearchRouter.get("/", CareerController.getByName)

export {CareerSearchRouter};