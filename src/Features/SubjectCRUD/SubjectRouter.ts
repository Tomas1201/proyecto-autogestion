
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
  SubjectController.GetAll
);


SubjectRouter.get(
  '/:Id',
  SubjectController.GetById
);


SubjectRouter.post(
  '/',
  validate({ body: CreateSubjectSchema }),
  SubjectController.Create
);

SubjectRouter.put(
  '/:Id',
  SubjectController.Update
);



export{SubjectRouter}
