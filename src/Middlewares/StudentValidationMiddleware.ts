import e, { Request, Response, NextFunction } from 'express';
import * as z from "zod";


/*
Aqui llegan los datos del alumno que se quiere crear por lo que
no van a llegar todos los campos, por lo que se valida que los campos
que se envian son los correctos y que no faltan datos obligatorios.
*/
const AlumnoSchema = z.object({
  id: z.uuid().optional(), //este dato no se envía al crear un nuevo alumno
  nombre: z.string().min(1, "Nombre is required"),
  apellido: z.string().min(1, "Apellido is required"),
  email: z.email("Invalid email format"),
  legajo: z.number().int().positive("Legajo must be a positive integer").optional(), //Este dato no se envía al crear un nuevo alumno se genera en la base de datos
  status: z.enum(["activo", "inactivo"], "Status must be either 'activo' or 'inactivo'").optional(), //Este dato no se envía al crear un nuevo alumno
  dni: z.number("El DNI tiene que ser numerico").int().positive("DNI must be a positive integer"),
  carrera: z.array(z.string()).optional(),
});

const AlumnoUpdateSchema = z.object({
  nombre: z.string().min(1, "Nombre is required").optional(),
  apellido: z.string().min(1, "Apellido is required").optional(),
  email: z.email("Invalid email format").optional(),
  legajo: z.number().int().positive("Legajo must be a positive integer").optional(),
  status: z.enum(["activo", "inactivo", "egresado", "libre"], "").optional(),
  dni: z.number("El DNI tiene que ser numerico").int().positive("DNI must be a positive integer").optional(),
  carrera: z.array(z.string()).optional(),
}); 


export const validateAlumno = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Tu lógica de validación aquí
    const validationResult = AlumnoSchema.parse(req.body);
    
    // Si la validación falla, envía respuesta pero no la retornes
    if (!validationResult) {
      
      res.status(400).json({ error: "Datos inválidos", errors: validationResult });
      return; // Solo return, sin valor
    }
    
    // Si todo está bien, continúa al siguiente middleware
    next();
  } catch (error) {
    // En caso de error, envía respuesta pero no la retornes
    res.status(400).json({ error: "Error de validación", errors: error });
    return; // Solo return, sin valor
  }
};

export const validateUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {
    // Validar el parámetro de estado
    const data = req.body;
    AlumnoUpdateSchema.parse(data);
    
    // Si la validación es exitosa, continúa al siguiente middleware
    next();
  } catch (error) {
    // En caso de error, envía respuesta pero no la retornes
    res.status(400).json({ error: "Invalid information", details: error });
    return; // Solo return, sin valor
  }
}

export type AlumnoDTO = z.infer<typeof AlumnoSchema>;