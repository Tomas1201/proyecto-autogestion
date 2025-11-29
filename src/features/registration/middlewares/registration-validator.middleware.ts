import { z } from "zod";

export const CreateRegistrationSchema = z.object({
    studentId: z.string().uuid("Student ID must be a valid UUID"),
    academicPositionId: z.number().int().positive("Academic Position ID must be a positive integer"),
});

export const UpdateRegistrationSchema = z.object({
    status: z.string().min(1, "Status is required"),
    grade: z.number().min(1).max(10).optional(),
});
