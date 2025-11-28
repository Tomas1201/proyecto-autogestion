import { Attendance } from "../../shared/models/domain/attendance.model.js";
import { Registration } from "../../shared/models/domain/registration.model.js";
import { Student } from "../../shared/models/student.model.js";

export class AttendanceRepository {
  async createBulk(attendances: any[]) {
    return await Attendance.bulkCreate(attendances);
  }

  async findByRegistrationId(registrationId: string) {
    return await Attendance.findAll({ where: { registrationId } });
  }

  async findBySubjectAndDate(subjectId: string, date: string) {
    // This requires joining Registration -> AcademicPosition -> Subject
    // For simplicity, we'll fetch registrations first or rely on frontend sending registrationIds
    // But to "get attendance for a subject", we need to know which registrations belong to that subject.
    
    // Let's assume we pass registrationIds from service.
    return []; 
  }
  
  async findByRegistrationIdsAndDate(registrationIds: string[], date: string) {
    return await Attendance.findAll({
        where: {
            registrationId: registrationIds,
            date: date
        }
    });
  }
}
