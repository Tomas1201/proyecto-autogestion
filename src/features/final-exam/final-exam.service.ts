import { FinalExamRepository } from "./final-exam.repository.js";

import { CycleElectiveRepository } from "../cycle-elective/cycle-elective.repository.js";

export class FinalExamService {
  private repository = new FinalExamRepository();
  private cycleRepository = new CycleElectiveRepository();

  async getExamsBySubject(subjectId: string) {
    return await this.repository.findExamsBySubject(subjectId);
  }

  async getExamRegistrations(finalExamId: number) {
    return await this.repository.findExamRegistrations(finalExamId);
  }

  async updateGrade(registrationId: number, grade: number, status: string) {
    const currentCycle = await this.cycleRepository.getCurrentCycle();
    if (!currentCycle || !currentCycle.examTablesEnabled) {
      throw new Error("Exam tables are currently disabled. Grades cannot be updated.");
    }
    return await this.repository.updateExamGrade(registrationId, grade, status);
  }

  async createExam(data: any) {
    return await this.repository.createExam(data);
  }
}
