
import { Router } from 'express';
import { CareerController } from './CareerController.js';
import { validate } from '../../Shared/Middlewares/validateRequest.js';
import { createCareerSchema, UpdateCareerSchema } from '../../Shared/Middlewares/schemaValidator.js';

const CareerRouter = Router();

const asyncHandler = (
  fn: (req: any, res: any, next: any) => Promise<any>
) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// GET all
CareerRouter.get(
  '/',
  CareerController.getAll
);


CareerRouter.get(
  '/:Id',
  CareerController.getById
);


CareerRouter.post(
  '/',
  validate({ body: createCareerSchema }),
  CareerController.create
);

CareerRouter.put(
  '/:Id',
  CareerController.update
);



export{CareerRouter}
