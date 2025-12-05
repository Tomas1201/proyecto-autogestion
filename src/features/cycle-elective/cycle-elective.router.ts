import { Router } from "express";
import { CycleElectiveController } from "./cycle-elective.controller.js";

export const cycleElectiveRouter = Router();
const controller = new CycleElectiveController();

cycleElectiveRouter.post("/", controller.createCycle);
cycleElectiveRouter.get("/", controller.getAllCycles);
cycleElectiveRouter.get("/current", controller.getCurrentCycle);
cycleElectiveRouter.patch("/:id/exam-tables", controller.toggleExamTables);
