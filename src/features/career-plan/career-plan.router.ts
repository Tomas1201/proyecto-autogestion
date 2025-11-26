import { Router } from 'express';
import { CareerPlanController } from './career-plan.controller.js';
import { authorize, ROLES } from '../../shared/middlewares/protection.middleware.js';

const router = Router();
const controller = new CareerPlanController();

// All routes in this module will be protected and only accessible by ADMIN
router.use(authorize([ROLES.ADMIN]));

// Routes for CareerPlan
router.post('/career-plans', controller.createPlan);
router.get('/career-plans/:id', controller.getPlanById);
router.put('/career-plans/:id', controller.updatePlan);
router.delete('/career-plans/:id', controller.deletePlan);

// Route to get all plans for a specific career
router.get('/careers/:careerId/plans', controller.getPlansByCareer);

// Routes for managing subjects within a career plan
router.post('/career-plans/:id/subjects', controller.addSubject);
router.delete('/career-plans/:planId/subjects/:subjectId', controller.removeSubject);


export const careerPlanRouter = router;
