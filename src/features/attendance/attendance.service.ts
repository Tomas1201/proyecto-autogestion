import { AttendanceRepository } from "./attendance.repository.js";
import { RegistrationRepository } from "../registration/registration.repository.js";

export class AttendanceService {
  private repository = new AttendanceRepository();
  private registrationRepository = new RegistrationRepository();

  async saveAttendance(data: { subjectId: string; date: string; students: { studentId: string; isPresent: boolean }[] }) {
    // 1. Get registrations for the subject to map studentId -> registrationId
    const registrations = await this.registrationRepository.findRegistrationsBySubject(data.subjectId);
    
    const attendanceRecords = data.students.map(s => {
      const reg = registrations.find(r => r.studentId === s.studentId);
      if (!reg) return null;
      return {
        registrationId: reg.registrationId,
        date: data.date,
        isPresent: s.isPresent
      };
    }).filter(r => r !== null);

    if (attendanceRecords.length === 0) return [];

    // Check if attendance already exists for this date/registrations to avoid duplicates?
    // For MVP, we just insert. Or we could destroy previous for that date.
    
    return await this.repository.createBulk(attendanceRecords);
  }

  async getAttendanceBySubject(subjectId: string, date: string) {
    const registrations = await this.registrationRepository.findRegistrationsBySubject(subjectId);
    const registrationIds = registrations.map(r => r.registrationId);
    
    const attendances = await this.repository.findByRegistrationIdsAndDate(registrationIds, date);
    
    // Merge with student info
    return registrations.map(reg => {
      const att = attendances.find(a => a.registrationId === reg.registrationId);
      return {
        studentId: reg.studentId,
        name: reg.name,
        lastName: reg.lastName,
        isPresent: att ? att.isPresent : false // Default to false if not recorded
      };
    });
  }
}
