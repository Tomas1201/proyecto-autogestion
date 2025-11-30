import { Router } from "express";
import * as ProfessorController from "./professor-crud.controller.js";

const ProfessorCRUDRouter = Router();


ProfessorCRUDRouter.post("/",ProfessorController.registerProfessor);


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

ProfessorCRUDRouter.get(
  "/:id/subjects",
  ProfessorController.getProfessorSubjects
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
