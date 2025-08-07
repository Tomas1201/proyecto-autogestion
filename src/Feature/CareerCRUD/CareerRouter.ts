// src/routes/Career.Router.ts
import { Router } from 'express';
import { CareerController } from './CareerController.js';
import { validate } from '../../Middlewares/validateRequest.js';
import { createCareerSchema, UpdateCareerSchema, FindCareerByIdSchema } from '../../Middlewares/schemaValidator.js';

const router = Router();

const asyncHandler = (
  fn: (req: any, res: any, next: any) => Promise<any>
) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// GET all
router.get(
  '/',
  asyncHandler(CareerController.getAll)
);

// GET by ID con validación de params
router.get(//VER SI ESTAN BIEN LAS VALIDACIONES CON ZODS
  '/:id',
  validate({ params: CareerIdSchema }),
  asyncHandler(CareerController.getById)
);

// POST nueva Career con validación del body
router.post(
  '/',
  validate({ body: createCareerSchema }),
  asyncHandler(CareerController.create)
);

// PUT actualizar Career con validación de body + params
router.put(
  '/:id',
  validate({ params: FindCareerByIdSchema, body: UpdateCareerSchema }),
  asyncHandler(CareerController.update)
);

// DELETE Career con validación de params
router.delete(
  '/:id',
  validate({ params: FindCareerByIdSchema }),
  asyncHandler(CareerController.delete)
);

export default router;
