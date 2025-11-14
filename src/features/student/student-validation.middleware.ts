import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const StudentSchema = z.object({
  id: z.uuid().optional(), // This field is not sent when creating a new student
  name: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email format"),
  file: z.number().int().positive("Student ID must be a positive integer"), // This field is generated in the database
  status: z.enum(["Active", "Inactive"], "Status must be either 'activo' or 'inactivo'").optional(),
  dni: z.number("National ID must be numeric" )
    .int()
    .positive("National ID must be a positive integer"),
  career: z.array(z.string()).optional(),
});

const StudentUpdateSchema = z.object({
  name: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  email: z.email("Invalid email format").optional(),
  studentId: z.number().int().positive("Student ID must be a positive integer").optional(),
  status: z.enum(["Active", "Inactive", "Graduated", "Free"],"Invalid status value" ).optional(),
  dni: z.number("National ID must be numeric" )
    .int()
    .positive("National ID must be a positive integer")
    .optional(),
  majors: z.array(z.string()).optional(),
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
