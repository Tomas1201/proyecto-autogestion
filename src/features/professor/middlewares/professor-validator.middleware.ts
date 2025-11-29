import { z } from "zod";

export const ProfessorSchema = z.object({
  name: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dni: z.string().min(7, "DNI must have at least 7 digits").max(10),
  file: z.string().min(1, "File number is required"),
  email: z.email("tenia que ser un correr").optional(),
  academicTitle: z.string().min(1, "Academic title is required"),
  phone: z.string().min(1, "Phone number is required"),
  scheduleAvailability: z.string().min(1, "Time availability is required"),
  id: z.number().int().positive("ID must be a positive number").optional(),
});

export const SubjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  day: z.enum(
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "Day is required"
  ),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

export const SearchProfessorSchema = z.object({
  firstName: z.string().optional(),
  dni: z.string().optional(),
  fileNumber: z.string().optional(),
  academicTitle: z.string().optional(),
  phone: z.string().optional(),
  timeAvailability: z.string().optional(),
  email: z.string().optional(),
});

export const UpdateProfessorSchema = ProfessorSchema.partial();

export const AssignSubjectSchema = z.object({
  professorId: z.string().uuid("Professor ID must be a valid UUID"),
  subjectId: z.string().uuid("Subject ID must be a valid UUID"),
  role: z.enum(["Titular", "Adjunto", "JTP", "Ayudante"]),
  schedule: z.string().min(1, "Schedule is required"),
});