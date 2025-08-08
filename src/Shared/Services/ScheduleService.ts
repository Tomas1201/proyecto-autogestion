/*
import { Subject } from "../Models/SubjectModel.js";
import { ProfessorSubject } from "../Models/ProfessorSubjectModel.js";

export class ScheduleService {

  async checkAvailability(
    professorId: number,
    newSubjects: number[]
  ) {
    const currentAssignments = await ProfessorSubject.findAll({
      where: { professorId },
    });

    const currentSubjectIds = currentAssignments.map(a => a.subjectId);
    const allSubjects = await Subject.findAll({
      where: { id: [...currentSubjectIds, ...newSubjects] },
    });

    const current = allSubjects.filter(a => currentSubjectIds.includes(a.id));
    const newOnes = allSubjects.filter(a => newSubjects.includes(a.id));

    for (const newSubject of newOnes) {
      for (const currentSubject of current) {
        if (
          newSubject.Day === currentSubject.day &&
          newSubject.startTime < currentSubject.endTime &&
          newSubject.endTime > currentSubject.startTime
        ) {
          throw new Error(
            `Schedule conflict with existing subject on ${newSubject.day} from ${newSubject.startTime} to ${newSubject.endTime}`
          );
        }
      }
    }
  }
}
*/