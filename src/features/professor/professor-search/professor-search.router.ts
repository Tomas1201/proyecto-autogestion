import { Router } from "express";
import * as ProfessorController from "./professor-search.controller.js";
import "../../../shared/middlewares/protection.middleware.js";
const router = Router();

router.get("/professors/search/name/:name",ProfessorController.searchByName);
router.get(
  "/professors/search/lastname/:lastname",
  ProfessorController.searchByLastName
);
router.get("/professors/search/dni/:dni",ProfessorController.searchByDni);
router.get(
  "/professors/search/fileNumber/:fileNumber",
  ProfessorController.searchByFileNumber
);

export const ProfessorSearchRouter = router;