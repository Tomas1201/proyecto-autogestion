import { Router } from "express";
import { StudentPanelController } from "./student-panel.controller.js";
import { authorize, ROLES } from "../../../shared/middlewares/protection.middleware.js";

const router = Router();




router.get('/careers/:studentId', StudentPanelController.getCareers);
router.get('/available-subjects/:studentId', StudentPanelController.getAvailableSubjects);
router.post('/register-subject/:studentId/subjectId/:subjectId', StudentPanelController.registerForSubject);

router.get('/attendance/:studentId', StudentPanelController.getAttendance);
router.get('/grades/:studentId', StudentPanelController.getGrades);
router.get('/final-exams/:studentId', StudentPanelController.getAvailableFinalExams);
router.post('/register-final-exam/:studentId/finalExamId/:finalExamId', StudentPanelController.registerForFinalExam);

export const StudentPanelRouter = router;
