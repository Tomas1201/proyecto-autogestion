import { Router } from "express";
import * as ProfessorController from "./professor-crud.controller.js";

const ProfessorCRUDRouter = Router();

//Solo administrador
ProfessorCRUDRouter.post("/professors",ProfessorController.registerProfessor);

//Solo administrador
ProfessorCRUDRouter.post(
  "/professors/registerToSubject/:id",
  ProfessorController.registerProfessorToSubject
);

ProfessorCRUDRouter.get(
  "/professors/search/state/:state",
  ProfessorController.searchByState
);

ProfessorCRUDRouter.get("/professors" ,ProfessorController.searchProfessors);

ProfessorCRUDRouter.get(
  "/professors/:id",
  ProfessorController.searchProfessorById
);

ProfessorCRUDRouter.put("/professors/:id" ,ProfessorController.updateProfessor);

ProfessorCRUDRouter.put(
  "/professors/archive/:id",
  ProfessorController.archiveProfessor
);

ProfessorCRUDRouter.put(
  "/professors/unarchive/:id",
  ProfessorController.unarchiveProfessor
);

export { ProfessorCRUDRouter };
