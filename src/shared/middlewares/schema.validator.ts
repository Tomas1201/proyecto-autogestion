
import * as z from 'zod';



export const durationSchema = z.number()
  .int({ message: "The duration must be a whole number of years/semesters." })
  .min(1, { message: "The minimum duration of a Career is 1 unit (year or semester)." })
  .max(10, { message: "The maximum duration of a Career cannot exceed 10 units.." })
  .positive({ message: "The duration must be a positive number." });


export const createCareerSchema = z.object({
  name: z.string()
    .min(10, { message: "The name of the Career must have at least 10 characters." })
    .max(30, { message: "The Career name cannot exceed 30 characters.." }),
  description: z.string()
    .min(20, { message: "The Career description must be at least 20 characters." }),
 
  duration: durationSchema, 
  
});

export const findByNameSchema = z.object({
  params: z.object({
    name: z.string()
      .min(1, { message: "The Career name must have at least 1 character." })
      .max(20, { message: "The Career name cannot exceed 20 characters." }),
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