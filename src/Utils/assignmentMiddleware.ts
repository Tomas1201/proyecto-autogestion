import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

// Enum compatible con Zod
export enum RolEnum {
  titular = "titular",
  adjunto = "adjunto",
  ayudante = "ayudante",
}

// Esquema de validación
export const AssignmentSchema = z.object({
  professorId: z
    .number()
    .int()
    .min(1, "El ID del profesor debe ser un número positivo"),
  asignaturaId: z
    .number()
    .int()
    .min(1, "El ID de la asignatura debe ser un número positivo"),
  rol: z.enum(RolEnum), // sin errorMap
});

// Middleware de validación
export const validateAssignment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = AssignmentSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.issues }); // ✅ usar error.issues
    }
    return res
      .status(500)
      .json({ error: "Error interno al validar la asignación" });
  }
};
