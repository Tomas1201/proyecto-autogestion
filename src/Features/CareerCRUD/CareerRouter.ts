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

// GET by ID con validación de params
CareerRouter.get(//VER SI ESTAN BIEN LAS VALIDACIONES CON ZODS
  '/:id',
  asyncHandler(CareerController.getById)
);

// POST nueva Career con validación del body
CareerRouter.post(
  '/',
  validate({ body: createCareerSchema }),
  asyncHandler(CareerController.create)
);

// PUT actualizar Career con validación de body + params
CareerRouter.put(
  '/:id',
  asyncHandler(CareerController.update)
);

// DELETE Career con validación de params
CareerRouter.delete(
  '/:id',
  asyncHandler(CareerController.delete)
);

export{CareerRouter}
