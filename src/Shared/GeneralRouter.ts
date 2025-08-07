import {Router} from "express";
import { ProfessorSearchRouter } from "../Features/Professor/ProfessorSearch/ProfessorSearchRouter.js";
import {ProfessorCRUDRouter} from "../Features/Professor/ProfessorCRUD/ProfessorCRUDRouter.js";

const router = Router();

router.use(ProfessorSearchRouter);
router.use(ProfessorCRUDRouter);

export const GeneralRouter = router;
