import { Router } from "express";
import { CareerSubjectController } from "./career-subject.controller.js";

export const careerSubjectRouter = Router();
const controller = new CareerSubjectController();

// Obtiene todas las asignaturas de una carrera, incluyendo año y otra información del plan.
careerSubjectRouter.get(
  "/careers/:careerId/subjects",
  (req, res) => controller.getSubjectsByCareer(req, res)
);

// Asocia una asignatura a un plan de carrera específico
careerSubjectRouter.post(
  "/career-plans/:careerPlanId/subjects",
  (req, res) => controller.addSubjectToPlan(req, res)
);

// Elimina una asignatura de un plan de carrera
careerSubjectRouter.delete(
  "/subject-plans/:subjectPlanId",
  (req, res) => controller.removeSubjectFromPlan(req, res)
);
