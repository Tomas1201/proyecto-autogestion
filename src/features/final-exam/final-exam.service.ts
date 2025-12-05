import { FinalExamRepository } from "./final-exam.repository.js";

export class FinalExamService {
  private repository = new FinalExamRepository();

  async getExamsBySubject(subjectId: string) {
    return await this.repository.findExamsBySubject(subjectId);
  }

  async getExamRegistrations(finalExamId: number) {
    return await this.repository.findExamRegistrations(finalExamId);
  }

  async updateGrade(registrationId: number, grade: number, status: string) {
    return await this.repository.updateExamGrade(registrationId, grade, status);
  }
  
  async createExam(data: any) {
      return await this.repository.createExam(data);
  }
}
