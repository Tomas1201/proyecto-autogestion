import { Router } from 'express';
import { AcademicManagementController } from './academic-management.controller.js';
import { authorize, ROLES } from '../../../shared/middlewares/protection.middleware.js';

const router = Router();

// Protect all routes for Professors and Admins
router.use(authorize([ROLES.PROFESSOR, ROLES.ADMIN]));

// Attendance
router.post('/attendance', AcademicManagementController.recordAttendance);

// Exams
router.post('/exams', AcademicManagementController.createExam);
router.post('/grades', AcademicManagementController.recordGrades);

// Final Exams
router.post('/final-exams', AcademicManagementController.createFinalExam);
router.post('/final-exams/grade', AcademicManagementController.gradeFinalExam);

export const AcademicManagementRouter = router;
