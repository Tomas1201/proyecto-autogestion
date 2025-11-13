import { Router } from "express";
import * as ProfessorController from "./professor-search.controller.js";
import { authorize, ROLES } from "../../../shared/middlewares/protection.middleware.js";
const router = Router();

router.get("/professors/search/name/:name", authorize([ROLES.ADMIN]),ProfessorController.searchByName);
router.get(
  "/professors/search/lastname/:lastname",authorize([ROLES.ADMIN]),
  ProfessorController.searchByLastName
);
router.get("/professors/search/dni/:dni", authorize([ROLES.ADMIN]),ProfessorController.searchByDni);
router.get(
  "/professors/search/fileNumber/:fileNumber",
  ProfessorController.searchByFileNumber
);

export const ProfessorSearchRouter = router;