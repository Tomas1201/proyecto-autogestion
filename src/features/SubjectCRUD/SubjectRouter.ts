
import { Router } from 'express';
import { SubjectController } from '../SubjectCRUD/SubjectController.js';


const SubjectRouter = Router();

const asyncHandler = (
  fn: (req: any, res: any, next: any) => Promise<any>
) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};


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
