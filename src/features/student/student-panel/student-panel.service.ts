import { StudentCareer } from "../../../shared/models/domain/student-career.model.js";
import { CareerPlanModel } from "../../../shared/models/domain/career-plan.model.js";
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
    static async getCareers(studentId: number) {
        try {
            // Manual fetch to avoid association issues
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

    static async getAvailableSubjects(studentId: number) {
        try {
            // 1. Get Student's Active Career
            const studentCareer = await StudentCareer.findOne({ where: { studentId: studentId, state: 'active' } });
            if (!studentCareer) return [];

            // 2. Get Subjects in the Plan
            const planSubjects = await SubjectPlanModel.findAll({ where: { careerPlanId: studentCareer.careerPlanId } });
            const subjectIds = planSubjects.map(ps => ps.subjectId);

            if (subjectIds.length === 0) return [];

            // 3. Get Available Academic Positions (Classes) for these subjects
            // Filter by current year/semester if possible, but for now just all open ones
            const academicPositions = await AcademicPositionModel.findAll({
                where: {
                    subjectId: { [Op.in]: subjectIds }
                },
                include: [Subject]
            });

            // 4. Filter out subjects already registered
            const registrations = await Registration.findAll({ where: { studentId: studentId } });
            const registeredPositionIds = registrations.map(r => r.academicPositionId);

            const available = academicPositions.filter(ap => !registeredPositionIds.includes(ap.id));

            return available;
        } catch (error) {
            console.error("Error fetching available subjects:", error);
            throw error;
        }
    }

    static async registerForSubject(studentId: number, academicPositionId: number) {
        try {
            // Check if already registered
            const existing = await Registration.findOne({ where: { studentId: studentId, academicPositionId: academicPositionId } });
            if (existing) throw new Error("Already registered");

            const registration = await Registration.create({
                studentId: studentId,
                academicPositionId: academicPositionId,
                date: new Date(),
                status: 'active' // Assuming a status field
            });
            return registration;
        } catch (error) {
            console.error("Error registering for subject:", error);
            throw error;
        }
    }

    static async getAttendance(studentId: number) {
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

    static async getGrades(studentId: number) {
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

    static async getAvailableFinalExams(studentId: number) {
        try {
            const studentCareer = await StudentCareer.findOne({ where: { studentId: studentId, state: 'active' } });
            if (!studentCareer) return [];

            const planSubjects = await SubjectPlanModel.findAll({ where: { careerPlanId: studentCareer.careerPlanId } });
            const subjectIds = planSubjects.map(ps => ps.subjectId);

            const finalExams = await FinalExam.findAll({
                where: {
                    subjectId: { [Op.in]: subjectIds },
                    date: { [Op.gt]: new Date() } // Future exams
                },
                include: [Subject]
            });

            return finalExams;
        } catch (error) {
            console.error("Error fetching final exams:", error);
            throw error;
        }
    }

    static async registerForFinalExam(studentId: number, finalExamId: number) {
        try {
            // Check if already registered
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
