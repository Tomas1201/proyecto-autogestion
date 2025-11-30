import { Router } from 'express';
import { AcademicManagementController } from './academic-management.controller.js';
import { authorize, ROLES } from '../../../shared/middlewares/protection.middleware.js';

const router = Router();


router.use(authorize([ROLES.PROFESSOR, ROLES.ADMIN]));


router.post('/attendance', AcademicManagementController.recordAttendance);


router.post('/exams', AcademicManagementController.createExam);
router.post('/grades', AcademicManagementController.recordGrades);


router.post('/final-exams', AcademicManagementController.createFinalExam);
router.post('/final-exams/grade', AcademicManagementController.gradeFinalExam);

export const AcademicManagementRouter = router;
