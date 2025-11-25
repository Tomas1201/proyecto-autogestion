import { Router } from "express";
import { RegistrationController } from "./registration.controller.js";

export const registrationRouter = Router();
const controller = new RegistrationController();

// Inscribir un estudiante a una asignatura (a través de una AcademicPosition)
registrationRouter.post(
  "/",
  (req, res) => controller.createRegistration(req, res)
);

// Obtener las inscripciones de un estudiante
registrationRouter.get(
  "/students/:studentId/registrations",
  (req, res) => controller.getStudentRegistrations(req, res)
);

// Darse de baja de una asignatura
registrationRouter.delete(
  "/:registrationId",
  (req, res) => controller.deleteRegistration(req, res)
);
