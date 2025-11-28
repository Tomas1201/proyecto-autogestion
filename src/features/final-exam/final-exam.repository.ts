import { FinalExam } from "../../shared/models/domain/final-exam.model.js";
import { ExamRegistration } from "../../shared/models/domain/exam-registration.model.js";
import { Student } from "../../shared/models/student.model.js";

export class FinalExamRepository {
  async findExamsBySubject(subjectId: string) {
    return await FinalExam.findAll({ where: { subjectId } });
  }

  async findExamRegistrations(finalExamId: number) {
    const registrations = await ExamRegistration.findAll({ where: { finalExamId } });
    
    // Manual join for student details
    const results = await Promise.all(registrations.map(async (reg: any) => {
      const student = await Student.findByPk(reg.studentId);
      return {
        id: reg.id,
        studentId: reg.studentId,
        finalExamId: reg.finalExamId,
        grade: reg.grade,
        status: reg.status,
        studentName: student ? student.name : 'Unknown',
        studentLastName: student ? student.lastName : 'Unknown',
        studentDni: student ? student.dni : 'Unknown'
      };
    }));
    
    return results;
  }

  async updateExamGrade(registrationId: number, grade: number, status: string) {
    return await ExamRegistration.update({ grade, status }, { where: { id: registrationId } });
  }
  
  async createExam(data: any) {
      return await FinalExam.create(data);
  }
}
