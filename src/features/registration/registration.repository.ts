import { AcademicPositionModel } from "../../shared/models/domain/academic-position.model.js";
import { Registration } from "../../shared/models/domain/registration.model.js";
import { Subject } from "../../shared/models/subject.model.js";

export class RegistrationRepository {
  public async createRegistration(studentId: string, academicPositionId: number): Promise<Registration> {
    return Registration.create({
      studentId,
      academicPositionId,
      status: 'ENROLLED',
    });
  }

  public async findStudentRegistrations(studentId: string): Promise<Registration[]> {
    return Registration.findAll({ where: { studentId } });
  }

  public async findStudentPassedSubjects(studentId: string): Promise<Subject[]> {
    const passedRegistrations = await Registration.findAll({
      where: {
        studentId,
        status: 'PASSED',
      },
      include: [{
        model: AcademicPositionModel,
        attributes: ['subjectId'],
        required: true,
      }],
    });

    const subjectIds = passedRegistrations.map(reg => (reg as any).AcademicPositionModel.subjectId);

    return Subject.findAll({
      where: {
        id: subjectIds,
      },
    });
  }

  public async deleteRegistration(registrationId: string): Promise<number> {
    return Registration.destroy({ where: { id: registrationId } });
  }
}
