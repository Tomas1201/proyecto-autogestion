// src/routes/Carrera.Router.ts
import { Router } from 'express';
import { CarreraController } from './Carrera.Controller.js';
import { validate } from '../Middlewares/validateRequest.js';
import { createCarreraSchema, updateCarreraSchema, carreraIdSchema } from '../Middlewares/schemaValidator.js';

const router = Router();

const asyncHandler = (
  fn: (req: any, res: any, next: any) => Promise<any>
) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// GET all
router.get(
  '/',
  asyncHandler(CarreraController.getAll)
);

// GET by ID con validación de params
router.get(
  '/:id',
  validate({ params: carreraIdSchema }),
  asyncHandler(CarreraController.getById)
);

// POST nueva carrera con validación del body
router.post(
  '/',
  validate({ body: createCarreraSchema }),
  asyncHandler(CarreraController.create)
);

// PUT actualizar carrera con validación de body + params
router.put(
  '/:id',
  validate({ params: carreraIdSchema, body: updateCarreraSchema }),
  asyncHandler(CarreraController.update)
);

// DELETE carrera con validación de params
router.delete(
  '/:id',
  validate({ params: carreraIdSchema }),
  asyncHandler(CarreraController.delete)
);

export default router;
