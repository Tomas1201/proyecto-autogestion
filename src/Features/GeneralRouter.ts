import {Router} from 'express';
import {StudentCRUDRouter} from './Student/StudentCRUD/StudentCRUDRouter.js';
import {StudentSearchRouter} from './Student/StudentSearch/StudentSearchRouter.js';
import StudentStatusRouter from './Student/StudentStatus/StudentStatusRouter.js';
import RegistrationRouter from './Student/Registration/RegistrationRouter.js';

const GeneralRouter = Router();

GeneralRouter.use('/students', StudentCRUDRouter);
GeneralRouter.use('/students', StudentStatusRouter);
GeneralRouter.use('/students', RegistrationRouter);
GeneralRouter.use('/students/search', StudentSearchRouter);

export {GeneralRouter};
