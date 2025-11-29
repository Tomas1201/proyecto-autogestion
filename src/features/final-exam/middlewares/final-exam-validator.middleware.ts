import { z } from "zod";

export const CreateFinalExamSchema = z.object({
    subjectId: z.string().uuid("Subject ID must be a valid UUID"),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Date must be a valid date string",
    }),
    classroom: z.string().min(1, "Classroom is required"),
});

export const UpdateExamGradeSchema = z.object({
    grade: z.number().min(1).max(10),
    status: z.string().min(1, "Status is required"),
});
