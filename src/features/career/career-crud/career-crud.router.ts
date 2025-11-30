
import { Router } from 'express';
import { CareerController } from './career-crud.controller.js';
import { validate } from '../../../shared/middlewares/validate-request.validator.js';
import { createCareerSchema, UpdateCareerSchema } from '../../../shared/middlewares/schema.validator.js';
import { authorize,ROLES } from '../../../shared/middlewares/protection.middleware.js';
const CareerRouter = Router();

const asyncHandler = (
  fn: (req: any, res: any, next: any) => Promise<any>
) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};


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



export{CareerRouter}
