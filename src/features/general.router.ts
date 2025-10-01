import { Router } from "express";
import {CareerRouter} from "./CareerCRUD/CareerRouter.js";
import CareerSearchRouter from "./CareerSearch/CareerSearchRouter.js";
import {studentCRUDRouter} from './student/student-crud/student-crud.router.js';
import {StudentSearchRouter} from './student/student-search/student-search.router.js';
import { ProfessorSearchRouter } from "./Professor/ProfessorSearch/ProfessorSearchRouter.js";
import {ProfessorCRUDRouter} from "./Professor/ProfessorCRUD/ProfessorCRUDRouter.js";

 const generalRouter = Router();

generalRouter.use("/Career", CareerRouter);
generalRouter.use("/Career/Search", CareerSearchRouter);
generalRouter.use('/students', studentCRUDRouter);
generalRouter.use('/students/search', StudentSearchRouter);
generalRouter.use("/professor/search",ProfessorSearchRouter);
generalRouter.use("/professor",ProfessorCRUDRouter);

export default generalRouter;
