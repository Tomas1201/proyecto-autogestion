
import * as z from 'zod';



export const durationSchema = z.number()
  .int({ message: "The duration must be a whole number of years/semesters." })
  .min(1, { message: "The minimum duration of a Career is 1 unit (year or semester)." })
  .max(10, { message: "The maximum duration of a Career cannot exceed 10 units.." })
  .positive({ message: "The duration must be a positive number." });


export const createCareerSchema = z.object({
  Name: z.string()
    .min(10, { message: "The name of the Career must have at least 50 characters." })
    .max(255, { message: "The Career name cannot exceed 255 characters.." }),
  Description: z.string()
    .min(10, { message: "The Career description must be at least 10 characters." })
    .max(1000, { message: "The Career description cannot exceed 1000 characters." }),
  Duration: durationSchema, // Reutilizamos el esquema de duración
});

export const findByNameSchema = z.object({
  params: z.object({
    name: z.string()
      .min(1, { message: "The Career name must have at least 1 character." })
      .max(20, { message: "The Career name cannot exceed 255 characters." }),
  }),
});


export const UpdateCareerSchema = createCareerSchema.partial();

export const findCareerByIdSchema = z.object({
  params: z.object({
    id: z.uuid({ message: "The Career ID must be a valid UUID." }),
  }),
});


export type CreateCareerDto = z.infer<typeof createCareerSchema>;
export type UpdateCareerDto = z.infer<typeof UpdateCareerSchema>;
export type CareerIdDto = z.infer<typeof findCareerByIdSchema>;