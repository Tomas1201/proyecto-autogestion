
import { Router } from 'express';
import { careerController } from './CareerController.js';
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
  asyncHandler(careerController.getAll.bind(careerController))
);


CareerRouter.get(
  '/:Id',
  asyncHandler(careerController.getById.bind(careerController))
);


CareerRouter.post(
  '/',
  validate({ body: createCareerSchema }),
  asyncHandler(careerController.create.bind(careerController))
);

CareerRouter.put(
  '/:Id',
  asyncHandler(careerController.update.bind(careerController))
);



export{CareerRouter}
