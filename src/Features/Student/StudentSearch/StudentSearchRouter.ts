import { Router } from 'express';
import { StudentSearchController } from './StudentSearchController.js';

const StudentSearchRouter = Router();

// Devuelve un alumno por nombre
StudentSearchRouter.get("/Name/:Name", StudentSearchController.getStudentsByName);

// Devuelve un alumno por apellido
StudentSearchRouter.get("/LastName/:LastName", StudentSearchController.getStudentsByLastName);

StudentSearchRouter.get("/Subject/:Subject", StudentSearchController.getBySubject);

StudentSearchRouter.get("/Career/:Career", StudentSearchController.getByCareer);

export { StudentSearchRouter };