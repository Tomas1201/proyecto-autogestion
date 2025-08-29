import { Router } from 'express';
import { StudentSearchController } from './StudentSearchController.js';

const StudentSearchRouter = Router();


StudentSearchRouter.get("/name/:Name", StudentSearchController.getStudentsByName);

StudentSearchRouter.get("/lastname/:LastName", StudentSearchController.getStudentsByLastName);

StudentSearchRouter.get("/subject/:Subject", StudentSearchController.getBySubject);

StudentSearchRouter.get("/dni/:Dni", StudentSearchController.getByDni);

StudentSearchRouter.get("/career/:Career", StudentSearchController.getByCareer);

export { StudentSearchRouter };