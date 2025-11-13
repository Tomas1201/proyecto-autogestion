import { Router } from "express";
import * as ProfessorController from "./professor-crud.controller.js";
import { authorize, ROLES } from "../../../shared/middlewares/protection.middleware.js";
const ProfessorCRUDRouter = Router();

//Solo administrador
ProfessorCRUDRouter.post("/professors", authorize([ROLES.ADMIN]),ProfessorController.registerProfessor);

//Solo administrador
ProfessorCRUDRouter.post(
  "/professors/registerToSubject/:id",authorize([ROLES.ADMIN]),
  ProfessorController.registerProfessorToSubject
);

ProfessorCRUDRouter.get(
  "/professors/search/state/:state",authorize([ROLES.ADMIN]),
  ProfessorController.searchByState
);

ProfessorCRUDRouter.get("/professors",authorize([ROLES.ADMIN]) ,ProfessorController.searchProfessors);

ProfessorCRUDRouter.get(
  "/professors/:id",
  ProfessorController.searchProfessorById
);

ProfessorCRUDRouter.put("/professors/:id",authorize([ROLES.ADMIN]) ,ProfessorController.updateProfessor);

ProfessorCRUDRouter.put(
  "/professors/archive/:id",authorize([ROLES.ADMIN]),
  ProfessorController.archiveProfessor
);

ProfessorCRUDRouter.put(
  "/professors/unarchive/:id",authorize([ROLES.ADMIN]),
  ProfessorController.unarchiveProfessor
);

export { ProfessorCRUDRouter };
