import { z } from 'zod';

// Primero definimos el Enum de forma explícita
export enum RolEnum {
  titular = 'titular',
  adjunto = 'adjunto',
  ayudante = 'ayudante',
}

// Y lo usamos en el esquema con z.nativeEnum
export const AssignmentSchema = z.object({
  professorId: z.number().int().min(1, 'professorId debe ser un número válido'),
  asignaturaId: z.number().int().min(1, 'asignaturaId debe ser un número válido'),
  rol: z.nativeEnum(RolEnum),
});
