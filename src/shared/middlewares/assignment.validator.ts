/*
import { z } from "zod";

 enum RoleEnum {
  titular = "titular",
  adjunct = "adjunct",
  assistant = "assistant",
}

export const AssignmentSchema = z.object({
  professorId: z.number().int().min(1, "professorId must be valid number"),
  subjectId: z.number().int().min(1, "subjectId must be valid number"),
  role: z.enum(RoleEnum),
});

*/