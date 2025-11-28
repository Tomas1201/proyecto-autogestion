import { Router } from "express";
import { StudentPanelController } from "./student-panel.controller.js";
import { authorize, ROLES } from "../../../shared/middlewares/protection.middleware.js";

const router = Router();

// Protect all routes with STUDENT role
//router.use(authorize([ROLES.USER]));

router.get('/careers', StudentPanelController.getCareers);
router.get('/available-subjects', StudentPanelController.getAvailableSubjects);
router.post('/register-subject', StudentPanelController.registerForSubject);

router.get('/attendance', StudentPanelController.getAttendance);
router.get('/grades', StudentPanelController.getGrades);
router.get('/final-exams', StudentPanelController.getAvailableFinalExams);
router.post('/register-final-exam', StudentPanelController.registerForFinalExam);

export const StudentPanelRouter = router;
