import { Router } from "express";
import {CareerRouter} from "./career/career-crud/career-crud.router.js";
import CareerSearchRouter from "./career/career-search/career-search.router.js";
import {studentCRUDRouter} from './student/student-crud/student-crud.router.js';
import {StudentSearchRouter} from './student/student-search/student-search.router.js';
import { ProfessorSearchRouter } from "./professor/professor-search/professor-search.router.js";
import {ProfessorCRUDRouter} from "./professor/professor-crud/professor-crud.router.js";
import {authRouter} from "./auth/auth.router.js";
import {SubjectRouter} from "./SubjectCRUD/SubjectRouter.js";
import { careerSubjectRouter } from "./career-subject/career-subject.router.js";
import { registrationRouter } from "./registration/registration.router.js";

 const generalRouter = Router();

generalRouter.use("/auth", authRouter)
generalRouter.use("/career", CareerRouter);
generalRouter.use("/career/search", CareerSearchRouter);
generalRouter.use('/student', studentCRUDRouter);
generalRouter.use('/student/search', StudentSearchRouter);
generalRouter.use("/professor/search",ProfessorSearchRouter);
generalRouter.use("/professor",ProfessorCRUDRouter);
generalRouter.use("/subject",SubjectRouter);
generalRouter.use("/careersubject", careerSubjectRouter);
generalRouter.use("/registrations", registrationRouter);

export default generalRouter;
