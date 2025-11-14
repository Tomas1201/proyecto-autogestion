import { Router } from "express";
import * as ProfessorController from "./professor-crud.controller.js";

const ProfessorCRUDRouter = Router();

//Solo administrador
ProfessorCRUDRouter.post("/",ProfessorController.registerProfessor);

//Solo administrador
ProfessorCRUDRouter.post(
  "/registerToSubject/:id",
  ProfessorController.registerProfessorToSubject
);

ProfessorCRUDRouter.get(
  "/search/state/:state",
  ProfessorController.searchByState
);

ProfessorCRUDRouter.get("/" ,ProfessorController.searchProfessors);

ProfessorCRUDRouter.get(
  "/:id",
  ProfessorController.searchProfessorById
);

ProfessorCRUDRouter.put("/:id" ,ProfessorController.updateProfessor);

ProfessorCRUDRouter.put(
  "/archive/:id",
  ProfessorController.archiveProfessor
);

ProfessorCRUDRouter.put(
  "/unarchive/:id",
  ProfessorController.unarchiveProfessor
);

export { ProfessorCRUDRouter };
