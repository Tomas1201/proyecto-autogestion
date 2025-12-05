import { StudentCareer } from "../../../shared/models/domain/student-career.model.js";
import { SubjectPlanModel } from "../../../shared/models/domain/subject-plan.model.js";
import { AcademicPositionModel } from "../../../shared/models/domain/academic-position.model.js";
import { Registration } from "../../../shared/models/domain/registration.model.js";
import { Attendance } from "../../../shared/models/domain/attendance.model.js";
import { Grade } from "../../../shared/models/domain/grade.model.js";
import { Exam } from "../../../shared/models/domain/exam.model.js";
import { FinalExam } from "../../../shared/models/domain/final-exam.model.js";
import { FinalExamRegistration } from "../../../shared/models/domain/final-exam-registration.model.js";
import { Subject } from "../../../shared/models/subject.model.js";
import { Career } from "../../../shared/models/career.model.js";
import { Op } from "sequelize";

export class StudentPanelService {
    static async getCareers(studentId: string) {
        try {
            
            const studentCareers = await StudentCareer.findAll({ where: { studentId: studentId } });
            const careerIds = studentCareers.map(sc => sc.careerId);

            if (careerIds.length === 0) return [];

            const careers = await Career.findAll({
                where: { id: { [Op.in]: careerIds } }
            });
            return careers;
        } catch (error) {
            console.error("Error fetching careers:", error);
            throw error;
        }
    }

    static async getAvailableSubjects(studentId: string) {
        try {
            
            const studentCareer = await StudentCareer.findOne({ where: { studentId: studentId, state: 'active' } });
            if (!studentCareer) return [];

            
            const planSubjects = await SubjectPlanModel.findAll({ where: { careerId: studentCareer.careerId } });
            const subjectIds = planSubjects.map(ps => ps.subjectId);

            if (subjectIds.length === 0) return [];

            
            
            const academicPositions = await AcademicPositionModel.findAll({
                where: {
                    subjectId: { [Op.in]: subjectIds }
                },
                include: [Subject]
            });

            
            const registrations = await Registration.findAll({ where: { studentId: studentId } });
            const registeredPositionIds = registrations.map(r => r.academicPositionId);

            const available = academicPositions.filter(ap => !registeredPositionIds.includes(ap.id));

            return available;
        } catch (error) {
            console.error("Error fetching available subjects:", error);
            throw error;
        }
    }

    static async registerForSubject(studentId: string, academicPositionId: string) {
        try {
            
            const existing = await Registration.findOne({ where: { studentId: studentId, academicPositionId: academicPositionId } });
            if (existing) throw new Error("Already registered");

            const registration = await Registration.create({
                studentId: studentId,
                academicPositionId: academicPositionId,
                status: 'active' 
            });
            return registration;
        } catch (error) {
            console.error("Error registering for subject:", error);
            throw error;
        }
    }

    static async getAttendance(studentId: string) {
        try {
            const attendance = await Attendance.findAll({
                where: { studentId },
                include: [{ model: AcademicPositionModel, include: [Subject] }]
            });
            return attendance;
        } catch (error) {
            console.error("Error fetching attendance:", error);
            throw error;
        }
    }

    static async getGrades(studentId: string) {
        try {
            const grades = await Grade.findAll({
                where: { studentId },
                include: [{ model: Exam, include: [{ model: AcademicPositionModel, include: [Subject] }] }]
            });
            return grades;
        } catch (error) {
            console.error("Error fetching grades:", error);
            throw error;
        }
    }

    static async getAvailableFinalExams(studentId: string) {
        try {
            const studentCareer = await StudentCareer.findOne({ where: { studentId: studentId, state: 'active' } });
            if (!studentCareer) return [];

            const planSubjects = await SubjectPlanModel.findAll({ where: { careerId: studentCareer.careerId } });
            const subjectIds = planSubjects.map(ps => ps.subjectId);

            const finalExams = await FinalExam.findAll({
                where: {
                    subjectId: { [Op.in]: subjectIds },
                    date: { [Op.gt]: new Date() } 
                },
                include: [Subject]
            });

            return finalExams;
        } catch (error) {
            console.error("Error fetching final exams:", error);
            throw error;
        }
    }

    static async registerForFinalExam(studentId: string, finalExamId: string) {
        try {
            
            const existing = await FinalExamRegistration.findOne({ where: { studentId, finalExamId } });
            if (existing) throw new Error("Already registered for this exam");

            const registration = await FinalExamRegistration.create({
                studentId,
                finalExamId,
                state: 'registered'
            });
            return registration;
        } catch (error) {
            console.error("Error registering for final exam:", error);
            throw error;
        }
    }
}
