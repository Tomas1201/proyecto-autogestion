import { z } from "zod";

export const SaveAttendanceSchema = z.object({
    subjectId: z.string().uuid("Subject ID must be a valid UUID"),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Date must be a valid date string",
    }),
    students: z.array(
        z.object({
            studentId: z.string().uuid("Student ID must be a valid UUID"),
            isPresent: z.boolean(),
        })
    ).min(1, "At least one student is required"),
});
