import { Router } from "express";
import { authMiddleware } from "../Utils/authMiddleware.js";
import * as ProfessorController from "./ProfessorController.js";
//import { deleteProfessor } from './ProfessorController.js';
import { authorizeAdmin } from "../Utils/authMiddleware.js";
import { catchAsync } from "../Utils/catchAsync.js";

const router = Router();

// Solo permite a administradores académicos
router.post(
  "/profesores",
  authMiddleware(["ADMIN_ACADEMICO"]),
  ProfessorController.registerProfessor
);
router.post(
  "/profesores/asignatura",
  authMiddleware(["ADMIN_ACADEMICO"]),
  ProfessorController.registerAsignatura
);
router.post(
  "/profesores/registerToAsignatura/:id",
  authMiddleware(["ADMIN_ACADEMICO"]),
  ProfessorController.registerProfessorToAsignatura
);
router.put(
  "/profesores/:id",
  authMiddleware(["ADMIN_ACADEMICO"]),
  ProfessorController.updateProfessor
);
router.get(
  "/profesores/search/state/:state",
  authMiddleware(["ADMIN_ACADEMICO"]),
  ProfessorController.searchByState
);
router.put(
  "/profesores/archive/:id",
  authMiddleware(["ADMIN_ACADEMICO"]),
  ProfessorController.archiveProfessor
);
router.put(
  "/profesores/unarchive/:id",
  authMiddleware(["ADMIN_ACADEMICO"]),
  ProfessorController.unarchiveProfessor
);
router.get(
  "/profesores",
  authMiddleware(["ADMIN_ACADEMICO"]),
  ProfessorController.searchProfessors
);
router.get(
  "/profesores/:id",
  authMiddleware(["ADMIN_ACADEMICO"]),
  ProfessorController.searchProfessorById
);
router.get(
  "/profesores/search/name/:name",
  authMiddleware(["ADMIN_ACADEMICO"]),
  ProfessorController.searchByName
);
router.get(
  "/profesores/search/lastname/:lastname",
  authMiddleware(["ADMIN_ACADEMICO"]),
  ProfessorController.searchByLastName
);
router.get(
  "/profesores/search/dni/:dni",
  authMiddleware(["ADMIN_ACADEMICO"]),
  ProfessorController.searchByDni
);
router.get(
  "/profesores/search/legajo/:legajo",
  authMiddleware(["ADMIN_ACADEMICO"]),
  ProfessorController.searchByLegajo
);

//router.delete('/profesores/:id', authMiddleware(['ADMIN_ACADEMICO']), deleteProfessor);

/*router.post('/', authorizeAdmin, catchAsync(registerProfessor));
router.put('/:id', authorizeAdmin, catchAsync(updateProfessor));
router.delete('/:id', authorizeAdmin, catchAsync(archiveProfessor));

*/
export const P = router;
