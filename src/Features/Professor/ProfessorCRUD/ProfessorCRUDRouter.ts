import { Router } from "express";
import * as ProfessorController from "./ProfessorCRUDController.js";
const router = Router();

router.post("/professors", ProfessorController.registerProfessor);
router.post(
  "/professors/registerToSubject/:id",
  ProfessorController.registerProfessorToSubject
);
router.get("/professors/search/state/:state", ProfessorController.searchByState);
router.get("/professors", ProfessorController.searchProfessors);
router.get("/professors/:id", ProfessorController.searchProfessorById);
router.put("/professors/:id", ProfessorController.updateProfessor);
router.put("/professors/archive/:id", ProfessorController.archiveProfessor);
router.put("/professors/unarchive/:id", ProfessorController.unarchiveProfessor);
export const ProfessorCRUDRouter = router;
