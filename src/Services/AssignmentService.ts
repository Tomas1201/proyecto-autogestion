import { ScheduleService } from "./ScheduleService.js";
import { ProfessorSubject } from "../Shared/Models/ProfessorSubjectModel.js";

const scheduleService = new ScheduleService();

export class AssignmentService {
  async assign(professors: number[], subjects: number[], role: string) {
    if (!role || !["titular", "adjunct", "assistant"].includes(role)) {
      throw new Error("Invalid role");
    }

    for (const professorId of professors) {
      await scheduleService.checkAvailability(professorId, subjects);
    }

    const assignments = professors.flatMap(professorId =>
      subjects.map(subjectId => ({
        professorId,
        subjectId,
        role,
      }))
    );

    return await ProfessorSubject.bulkCreate(assignments);
  }

  async unassign(professorId: number, subjectId: number) {
    const deleted = await ProfessorSubject.destroy({
      where: { professorId, subjectId },
    });

    if (deleted === 0) {
      throw new Error("Assignment does not exist or already deleted");
    }

    return { message: "Unassignment successful" };
  }
}