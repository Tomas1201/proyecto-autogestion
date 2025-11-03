
import { Router } from 'express';
import { SubjectController } from '../SubjectCRUD/SubjectController.js';
import { validate } from '../../Shared/Middlewares/validateRequest.js';
import { CreateSubjectSchema } from '../../Shared/Middlewares/schemaValidator.js';

const SubjectRouter = Router();

const asyncHandler = (
  fn: (req: any, res: any, next: any) => Promise<any>
) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// GET all
SubjectRouter.get(
  '/',
  SubjectController.getAll
);


SubjectRouter.get(
  '/:Id',
  SubjectController.getById
);


SubjectRouter.post(
  '/',
 
  SubjectController.create
);

SubjectRouter.put(
  '/:Id',
  SubjectController.update
);



export{SubjectRouter}
