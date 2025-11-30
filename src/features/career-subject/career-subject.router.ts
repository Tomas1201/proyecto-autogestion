import { Router } from "express";
import { CareerSubjectController } from "./career-subject.controller.js";

export const careerSubjectRouter = Router();
const controller = new CareerSubjectController();


careerSubjectRouter.get(
  "/careers/:careerId/subjects",
  (req, res) => controller.getSubjectsByCareer(req, res)
);


careerSubjectRouter.post(
  "/career-plans/:careerPlanId/subjects",
  (req, res) => controller.addSubjectToPlan(req, res)
);


careerSubjectRouter.delete(
  "/subject-plans/:subjectPlanId",
  (req, res) => controller.removeSubjectFromPlan(req, res)
);
