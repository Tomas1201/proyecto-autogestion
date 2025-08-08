

/*
Aqui llegan los datos del alumno que se quiere crear por lo que
no van a llegar todos los campos, por lo que se valida que los campos
que se envian son los correctos y que no faltan datos obligatorios.
*/
import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const StudentSchema = z.object({
  Id: z.uuid().optional(), // This field is not sent when creating a new student
  Name: z.string().min(1, "First name is required"),
  LastName: z.string().min(1, "Last name is required"),
  Email: z.email("Invalid email format"),
  File: z.number().int().positive("Student ID must be a positive integer"), // This field is generated in the database
  Status: z.enum(["Active", "Inactive"], "Status must be either 'activo' or 'inactivo'").optional(),
  Dni: z.number("National ID must be numeric" )
    .int()
    .positive("National ID must be a positive integer"),
  Career: z.array(z.string()).optional(),
});

const StudentUpdateSchema = z.object({
  Name: z.string().min(1, "First name is required").optional(),
  LastName: z.string().min(1, "Last name is required").optional(),
  Email: z.email("Invalid email format").optional(),
  StudentId: z.number().int().positive("Student ID must be a positive integer").optional(),
  Status: z.enum(["Active", "Inactive", "Graduated", "Free"],"Invalid status value" ).optional(),
  Dni: z.number("National ID must be numeric" )
    .int()
    .positive("National ID must be a positive integer")
    .optional(),
  Majors: z.array(z.string()).optional(),
});

export const ValidateStudent = async (
  Req: Request,
  Res: Response,
  Next: NextFunction
): Promise<void> => {
  try {
    const ValidationResult = StudentSchema.parse(Req.body);

    if (!ValidationResult) {
      Res.status(400).json({ Error: "Invalid data", Errors: ValidationResult });
      return;
    }

    Next();
  } catch (Error) {
    Res.status(400).json({ Error: "Validation error", Errors: Error });
    return;
  }
};

export const ValidateStudentUpdate = async (
  Req: Request,
  Res: Response,
  Next: NextFunction
): Promise<void> => {
  try {
    const Data = Req.body;
    StudentUpdateSchema.parse(Data);

    Next();
  } catch (Error) {
    Res.status(400).json({ Error: "Invalid information", Details: Error });
    return;
  }
};

export type StudentDTO = z.infer<typeof StudentSchema>;
