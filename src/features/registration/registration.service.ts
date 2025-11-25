import { RegistrationRepository } from "./registration.repository.js";
import { AcademicPositionModel } from "../../shared/models/domain/academic-position.model.js";
import { StudentCareer } from "../../shared/models/domain/student-career.model.js";
import { Correlation } from "../../shared/models/domain/correlations.model.js";
import { CareerPlanModel } from "../../shared/models/domain/career-plan.model.js";
import { Student } from "../../shared/models/student.model.js";
import { Registration } from "../../shared/models/domain/registration.model.js";

export class RegistrationService {
  private repository = new RegistrationRepository();

  public async createRegistration(studentId: string, academicPositionId: number): Promise<Registration> {
    // 1. Validate existence of student and academic position
    const student = await Student.findByPk(studentId);
    if (!student) {
      throw new Error("Student not found");
    }

    const academicPosition = await AcademicPositionModel.findByPk(academicPositionId);
    if (!academicPosition) {
      throw new Error("Academic Position not found");
    }

    const { subjectId, careerPlanId } = academicPosition as any;

    // 2. Validate student is enrolled in the career
    const careerPlan = await CareerPlanModel.findByPk(careerPlanId);
    if (!careerPlan) {
      throw new Error("Career Plan not found");
    }
    const { careerId } = careerPlan as any;

    const studentCareer = await StudentCareer.findOne({ where: { studentId, careerId, state: 'active' } });
    if (!studentCareer) {
      throw new Error(`Student is not enrolled in this career.`);
    }

    // 3. Validate prerequisites
    const requiredSubjects = await Correlation.findAll({
      where: {
        subjectToTake: subjectId,
        careerId: careerId,
      },
    });
    const requiredSubjectIds = requiredSubjects.map(c => c.subjectRequiedId);

    if (requiredSubjectIds.length > 0) {
      const passedSubjects = await this.repository.findStudentPassedSubjects(studentId);
      const passedSubjectIds = passedSubjects.map(s => s.id);

      for (const requiredId of requiredSubjectIds) {
        if (!passedSubjectIds.includes(requiredId)) {
          throw new Error(`Prerequisite not met. Missing subject approval for subject ID: ${requiredId}`);
        }
      }
    }

    // 4. Check if already enrolled or passed
    const existingRegistration = await Registration.findOne({
        where: { studentId, academicPositionId }
    });

    if (existingRegistration) {
        if(existingRegistration.status === 'PASSED') throw new Error("Student has already passed this subject.");
        if(existingRegistration.status === 'ENROLLED') throw new Error("Student is already enrolled in this subject.");
    }

    // 5. Create registration
    return this.repository.createRegistration(studentId, academicPositionId);
  }

  public async getStudentRegistrations(studentId: string): Promise<Registration[]> {
    return this.repository.findStudentRegistrations(studentId);
  }

  public async deleteRegistration(registrationId: string): Promise<number> {
    return this.repository.deleteRegistration(registrationId);
  }
}
