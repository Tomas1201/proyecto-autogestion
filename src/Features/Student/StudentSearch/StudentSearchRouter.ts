import { Router } from 'express';
import { StudentSearchController } from './StudentSearchController.js';

const StudentSearchRouter = Router();

// Devuelve un alumno por nombre
StudentSearchRouter.get("/nombre/:name", StudentSearchController.getStudentsByName);

// Devuelve un alumno por apellido
StudentSearchRouter.get("/apellido/:apellido", StudentSearchController.getStudentsByLastName);

StudentSearchRouter.get("/asignatura/:asignatura", StudentSearchController.getBySubject);

StudentSearchRouter.get("/carrera/:carrera", StudentSearchController.getByCareer);

export { StudentSearchRouter };