
import * as z from 'zod';



export const duracionSchema = z.number()
  .int({ message: "La duración debe ser un número entero de años/semestres." })
  .min(1, { message: "La duración mínima de una carrera es de 1 unidad (año o semestre)." })
  .max(10, { message: "La duración máxima de una carrera no puede exceder las 10 unidades." })
  .positive({ message: "La duración debe ser un número positivo." });


export const createCarreraSchema = z.object({
  nombre: z.string()
    .min(3, { message: "El nombre de la carrera debe tener al menos 3 caracteres." })
    .max(255, { message: "El nombre de la carrera no puede exceder los 255 caracteres." }),
  cant_alumno: z.number()
    .int({ message: "La cantidad de alumnos debe ser un número entero." })
    .min(0, { message: "La cantidad de alumnos no puede ser negativa." }),
  descripcion: z.string()
    .min(10, { message: "La descripción de la carrera debe tener al menos 10 caracteres." })
    .max(1000, { message: "La descripción de la carrera no puede exceder los 1000 caracteres." }),
  duracion: duracionSchema, // Reutilizamos el esquema de duración
});


export const updateCarreraSchema = createCarreraSchema.partial();

export const carreraIdSchema = z.object({
  id: z.uuid({ message: "El ID de la carrera debe ser un UUID válido." }),
});


export type CreateCarreraDto = z.infer<typeof createCarreraSchema>;
export type UpdateCarreraDto = z.infer<typeof updateCarreraSchema>;
export type CarreraIdDto = z.infer<typeof carreraIdSchema>;