import { Router } from "express";
import { FinalExamController } from "./final-exam.controller.js";

export const finalExamRouter = Router();
const controller = new FinalExamController();

finalExamRouter.post("/", (req, res) => controller.createExam(req, res));
finalExamRouter.get("/subject/:subjectId", (req, res) => controller.getExamsBySubject(req, res));
finalExamRouter.get("/:finalExamId/registrations", (req, res) => controller.getExamRegistrations(req, res));
finalExamRouter.put("/registrations/:registrationId", (req, res) => controller.updateGrade(req, res));
