import { Router } from "express";
import * as ProfessorController from "./ProfessorCRUDController.js";
const router = Router();

router.post("/professors", ProfessorController.registerProfessor);
router.post(
  "/professors/registerToSubject/:id",
  ProfessorController.registerProfessorToSubject
);
router.put("/professors/:id", ProfessorController.updateProfessor);
router.put("/professors/archive/:id", ProfessorController.archiveProfessor);
router.put("/professors/unarchive/:id", ProfessorController.unarchiveProfessor);
export const ProfessorRouter = router;
