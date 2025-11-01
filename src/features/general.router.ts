import { Router } from "express";
import {CareerRouter} from "./career/career-crud/career-crud.router.js";
import CareerSearchRouter from "./career/career-search/career-search.router.js";
import {studentCRUDRouter} from './student/student-crud/student-crud.router.js';
import {StudentSearchRouter} from './student/student-search/student-search.router.js';
import { ProfessorSearchRouter } from "./professor/professor-search/professor-search.router.js";
import {ProfessorCRUDRouter} from "./professor/professor-crud/professor-crud.router.js";

 const generalRouter = Router();

generalRouter.use("/Career", CareerRouter);
generalRouter.use("/Career/Search", CareerSearchRouter);
generalRouter.use('/students', studentCRUDRouter);
generalRouter.use('/students/search', StudentSearchRouter);
generalRouter.use("/professor/search",ProfessorSearchRouter);
generalRouter.use("/professor",ProfessorCRUDRouter);

export default generalRouter;
