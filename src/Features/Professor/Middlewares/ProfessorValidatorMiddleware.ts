import { z } from "zod";

export const ProfessorSchema = z.object({
  Name: z.string().min(1, "First name is required"),
  LastName: z.string().min(1, "Last name is required"),
  Dni: z.string().min(7, "DNI must have at least 7 digits").max(10),
  File: z.string().min(1, "File number is required"),
  Email: z.email("tenia que ser un correr").optional(),
  AcademicTitle: z.string().min(1, "Academic title is required"),
  Phone: z.string().min(1, "Phone number is required"),
  ScheduleAvailability: z.string().min(1, "Time availability is required"),
  Id: z.number().int().positive("ID must be a positive number").optional(),
});

export const SubjectSchema = z.object({
  Name: z.string().min(1, "Name is required"),
  Day: z.enum(
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "Day is required"
  ),
  StartTime: z.string().min(1, "Start time is required"),
  EndTime: z.string().min(1, "End time is required"),
});

export const SearchProfessorSchema = z.object({
  FirstName: z.string().optional(),
  Dni: z.string().optional(),
  FileNumber: z.string().optional(),
  AcademicTitle: z.string().optional(),
  Phone: z.string().optional(),
  TimeAvailability: z.string().optional(),
  Email: z.string().optional(),
});

export const UpdateProfessorSchema = ProfessorSchema.partial();