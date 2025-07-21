import { z } from 'zod';

export const ProfessorSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  dni: z.string().min(7, 'El DNI debe tener al menos 7 dígitos').max(10),
  legajo: z.string().min(1, 'El legajo es obligatorio'),
  correo: z.string().optional(),
  titulo_academico: z.string().min(1, 'El título académico es obligatorio'),
  telefono: z.string().min(1, 'El teléfono es obligatorio'),
  disponibilidad_horaria: z.string().min(1, 'La disponibilidad horaria es obligatoria'),
  id: z.number().int().positive('El ID debe ser un número positivo')
});

export const SearchProfessorSchema = z.object({
    nombre: z.string().optional(),
    dni: z.string().optional(),
    legajo: z.string().optional(),
    titulo_academico: z.string().optional(),
    telefono: z.string().optional(),
    disponibilidad_horaria: z.string().optional(),
    correo: z.string().optional()
  });

export const UpdateProfessorSchema = ProfessorSchema.partial();
