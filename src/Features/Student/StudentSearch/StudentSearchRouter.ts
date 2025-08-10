import { Router } from 'express';
import { StudentSearchController } from './StudentSearchController.js';

const StudentSearchRouter = Router();

// Devuelve un alumno por nombre
StudentSearchRouter.get("/name/:Name", StudentSearchController.getStudentsByName);

// Devuelve un alumno por apellido
StudentSearchRouter.get("/lastname/:LastName", StudentSearchController.getStudentsByLastName);

StudentSearchRouter.get("/subject/:Subject", StudentSearchController.getBySubject);

StudentSearchRouter.get("/career/:Career", StudentSearchController.getByCareer);

export { StudentSearchRouter };