import { Router } from "express";
import CarrerRouter from "./CareerCRUD/CareerRouter.js"
import CareerSearchRouter from "./CareerSearch/CareerSearchRouter.js";
import {StudentCRUDRouter} from './Student/StudentCRUD/StudentCRUDRouter.js';
import {StudentSearchRouter} from './Student/StudentSearch/StudentSearchRouter.js';
 const GeneralRouter = Router();

GeneralRouter.use("/Carrer", CarrerRouter);
GeneralRouter.use("/Career/Search", CareerSearchRouter);
GeneralRouter.use('/students', StudentCRUDRouter);
GeneralRouter.use('/students/search', StudentSearchRouter);

export default GeneralRouter;
