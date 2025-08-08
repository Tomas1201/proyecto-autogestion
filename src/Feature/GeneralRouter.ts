import { Router } from "express";
import CarrerRouter from "./CareerCRUD/CareerRouter.js"
import CareerSearchRouter from "./CareerSearch/CareerSearchRouter.js";
 const GeneralRouter = Router();

GeneralRouter.use("/Carrer", CarrerRouter);
GeneralRouter.use("/Career/Search", CareerSearchRouter)

export default GeneralRouter;
