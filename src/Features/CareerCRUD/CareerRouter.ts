// src/routes/Career.Router.ts
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
  asyncHandler(CareerController.getAll)
);


CareerRouter.get(
  '/:id',
  asyncHandler(CareerController.getById)
);


CareerRouter.post(
  '/',
  validate({ body: createCareerSchema }),
  asyncHandler(CareerController.create)
);


CareerRouter.put(
  '/:id',
  asyncHandler(CareerController.update)
);


CareerRouter.delete(
  '/:id',
  asyncHandler(CareerController.delete)
);

export default CareerRouter;
