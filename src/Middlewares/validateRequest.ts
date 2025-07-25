// src/middlewares/validateRequest.ts (actualizado con la corrección)
import { Request, Response, NextFunction } from 'express';
import {ZodType, ZodError, z } from 'zod'; // Asegúrate de importar ZodError

export const validate = (schema:ZodType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // CORRECCIÓN AQUÍ: Usamos 'error.issues' (en plural)
        const errors = error.issues.map(err => ({
          path: err.path.join('.'), // El camino al campo que falló
          message: err.message,     // El mensaje de error específico
        }));
        return res.status(400).json({
          message: "Error de validación",
          errors: errors, // Enviamos el array de errores mapeados
        });
      }
      // Para otros tipos de errores inesperados que no sean de Zod
      console.error("Error inesperado en middleware de validación:", error);
      return res.status(500).json({ message: "Error interno del servidor." });
    }
  };


// Para mayor consistencia y para evitar futuras deprecaciones, también cambiamos los tipos aquí.
export const createValidationSchema = (schemas: {
  body?: ZodType;   
  query?: ZodType; 
  params?: ZodType; 
}) => {
  return z.object({
    body: schemas.body || z.any(),
    query: schemas.query || z.any(),
    params: schemas.params || z.any(),
  });
};