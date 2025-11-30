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

    const subjectIds = passedRegistrations.map((reg: any) => reg.AcademicPositionModel.subjectId);

    return Subject.findAll({
      where: {
        id: subjectIds,
      },
    });
  }

  public async deleteRegistration(registrationId: string): Promise<number> {
    return Registration.destroy({ where: { id: registrationId } });
  }
  public async updateRegistration(registrationId: string, status: string, grade?: number): Promise<[number]> {
    return Registration.update(
      { status, grade },
      { where: { id: registrationId } }
    );

  }

  public async findRegistrationsBySubject(subjectId: string): Promise<any[]> {
    
    const academicPositions = await AcademicPositionModel.findAll({
      where: { subjectId }
    });
    
    const academicPositionIds = academicPositions.map((ap: any) => ap.id);
    
    if (academicPositionIds.length === 0) return [];

    
    const registrations = await Registration.findAll({
      where: { academicPositionId: academicPositionIds },
      
      
      
    });

    
    const results = await Promise.all(registrations.map(async (reg: any) => {
      const student = await import("../../shared/models/student.model.js").then(m => m.Student.findByPk(reg.studentId));
      return {
        registrationId: reg.id,
        status: reg.status,
        grade: reg.grade,
        studentId: reg.studentId,
        name: student ? student.name : 'Unknown',
        lastName: student ? student.lastName : 'Unknown',
        dni: student ? student.dni : 'Unknown',
        file: student ? student.file : 'Unknown'
      };
    }));

    return results;
  }
}

