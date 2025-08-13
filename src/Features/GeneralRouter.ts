import { Router } from "express";
import {CareerRouter} from "./CareerCRUD/CareerRouter.js";
import CareerSearchRouter from "./CareerSearch/CareerSearchRouter.js";
import {StudentCRUDRouter} from './Student/StudentCRUD/StudentCRUDRouter.js';
import {StudentSearchRouter} from './Student/StudentSearch/StudentSearchRouter.js';
import { ProfessorSearchRouter } from "../Features/Professor/ProfessorSearch/ProfessorSearchRouter.js";
import {ProfessorCRUDRouter} from "../Features/Professor/ProfessorCRUD/ProfessorCRUDRouter.js";
 const GeneralRouter = Router();

GeneralRouter.use("/Career", CareerRouter);
GeneralRouter.use("/Career/Search", CareerSearchRouter);
GeneralRouter.use('/students', StudentCRUDRouter);
GeneralRouter.use('/students/search', StudentSearchRouter);
GeneralRouter.use("/professor/search",ProfessorSearchRouter);
GeneralRouter.use("/professor",ProfessorCRUDRouter);

export default GeneralRouter;
