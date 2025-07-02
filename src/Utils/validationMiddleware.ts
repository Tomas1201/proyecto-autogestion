import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Middleware asincrónico para manejar validaciones
const handleValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    next();
  } catch (err) {
    next(err);
  }
};

// Ejemplo de validaciones para Alumno
export const validateAlumno = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isString().withMessage('El nombre debe ser un string'),
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido'),
  body('dni')
    .notEmpty().withMessage('El DNI es obligatorio')
    .isNumeric().withMessage('El DNI debe ser numérico'),
  handleValidation
];

// Puedes agregar más validaciones para otros recursos aquí

// Ejemplo de validación por parámetro de ruta
export const validateAlumnoId = [
  param('id')
    .notEmpty().withMessage('El ID es obligatorio')
    .isInt().withMessage('El ID debe ser un número entero'),
  handleValidation
];
