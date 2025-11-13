import { Router } from 'express';
import { StudentSearchController } from './student-search.controller.js';
import { authorize, ROLES } from '../../../shared/middlewares/protection.middleware.js';
const StudentSearchRouter = Router();


StudentSearchRouter.get("/name/:Name", authorize([ROLES.ADMIN]),StudentSearchController.getStudentsByName);

StudentSearchRouter.get("/lastname/:LastName", authorize([ROLES.ADMIN]),StudentSearchController.getStudentsByLastName);

StudentSearchRouter.get("/subject/:Subject", authorize([ROLES.ADMIN]),StudentSearchController.getBySubject);

StudentSearchRouter.get("/dni/:Dni", authorize([ROLES.ADMIN]),StudentSearchController.getByDni);

StudentSearchRouter.get("/career/:Career", StudentSearchController.getByCareer);

export { StudentSearchRouter };