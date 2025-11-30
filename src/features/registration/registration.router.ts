import { Router } from "express";
import { RegistrationController } from "./registration.controller.js";

export const registrationRouter = Router();
const controller = new RegistrationController();


registrationRouter.post(
  "/",
  (req, res) => controller.createRegistration(req, res)
);


registrationRouter.get(
  "/students/:studentId/registrations",
  (req, res) => controller.getStudentRegistrations(req, res)
);


registrationRouter.delete(
  "/:registrationId",
  (req, res) => controller.deleteRegistration(req, res)
);


registrationRouter.put(
  "/:registrationId",
  (req, res) => controller.updateRegistration(req, res)
);


registrationRouter.get(
  "/subject/:subjectId",
  (req, res) => controller.getRegistrationsBySubject(req, res)
);
