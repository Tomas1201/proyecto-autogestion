import { Router } from "express";
import CarrerRouter from "./CareerCRUD/CareerRouter.js"
import CareerSearchRouter from "./CareerSearch/CareerSearchRouter.js";
import {StudentCRUDRouter} from './Student/StudentCRUD/StudentCRUDRouter.js';
import {StudentSearchRouter} from './Student/StudentSearch/StudentSearchRouter.js';
import { ProfessorSearchRouter } from "../Features/Professor/ProfessorSearch/ProfessorSearchRouter.js";
import {ProfessorCRUDRouter} from "../Features/Professor/ProfessorCRUD/ProfessorCRUDRouter.js";
 const GeneralRouter = Router();

GeneralRouter.use("/Career", CarrerRouter);
GeneralRouter.use("/Career/Search", CareerSearchRouter);
GeneralRouter.use('/students', StudentCRUDRouter);
GeneralRouter.use('/students/search', StudentSearchRouter);
GeneralRouter.use("/Professor/Search",ProfessorSearchRouter);
GeneralRouter.use("/Professor",ProfessorCRUDRouter);

export default GeneralRouter;
