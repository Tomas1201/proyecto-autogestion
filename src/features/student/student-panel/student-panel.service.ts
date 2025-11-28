import { StudentCareer } from "../../../shared/models/domain/student-career.model.js";
import { Career } from "../../../shared/models/career.model.js";
import { Subject } from "../../../shared/models/subject.model.js";
import { SubjectPlanModel } from "../../../shared/models/domain/subject-plan.model.js";
import { AcademicPositionModel } from "../../../shared/models/domain/academic-position.model.js";
import { Registration } from "../../../shared/models/domain/registration.model.js";
import { Attendance } from "../../../shared/models/domain/attendance.model.js";
import { Grade } from "../../../shared/models/domain/grade.model.js";
import { Exam } from "../../../shared/models/domain/exam.model.js";
import { FinalExam } from "../../../shared/models/domain/final-exam.model.js";
import { FinalExamRegistration } from "../../../shared/models/domain/final-exam-registration.model.js";
import { Op } from "sequelize";

export class StudentPanelService {

    static async getCareers(studentId: number) {
        try {
            // Find careers linked to the student
            const studentCareers = await StudentCareer.findAll({
                where: { alumnoId: studentId, state: 'active' }
            });

            const careerIds = studentCareers.map(sc => sc.carreraId);

            if (careerIds.length === 0) return [];

            const careers = await Career.findAll({
                where: { id: { [Op.in]: careerIds } }
            });

            return careers;
        } catch (error) {
            console.error("Error fetching student careers:", error);
            throw new Error("Could not fetch careers");
        }
    }

    static async getAvailableSubjects(studentId: number) {
        try {
            // 1. Get Student's active career
            const studentCareer = await StudentCareer.findOne({
                where: { alumnoId: studentId, state: 'active' }
            });

            if (!studentCareer) {
                // Return empty if no career, or throw
                return [];
            }

            // 2. Get all subjects in the career plan
            const planSubjects = await SubjectPlanModel.findAll({
                where: { careerPlanId: studentCareer.PlanCarreraId }
            });

            if (planSubjects.length === 0) return [];

            const subjectIds = planSubjects.map(ps => ps.asignaturaId);

            // 3. Get subjects the student is already registered for
            const registrations = await Registration.findAll({
                where: { StudentId: studentId }
            });

            const academicPositionIds = registrations.map(r => r.AcademicPositionId);

            let registeredSubjectIds: any[] = [];
            if (academicPositionIds.length > 0) {
                const academicPositions = await AcademicPositionModel.findAll({
                    where: { Id: { [Op.in]: academicPositionIds } }
                });
                registeredSubjectIds = academicPositions.map(ap => ap.SubjectId);
            }

            // 4. Filter out registered subjects
            const availableSubjectIds = subjectIds.filter(id => !registeredSubjectIds.includes(id));

            if (availableSubjectIds.length === 0) return [];

            // 5. Fetch Subject details
            const subjects = await Subject.findAll({
                where: { id: { [Op.in]: availableSubjectIds } }
            });

            // Merge with Plan info
            const result = subjects.map(s => {
                const plan = planSubjects.find(ps => ps.asignaturaId == Number(s.id));
                return {
                    id: s.id,
                    name: s.name,
                    year: plan?.anio || 1,
                    workload: plan?.cargaHoraria || 0,
                    isOptional: plan?.isoptativa || false
                };
            });

            return result;

        } catch (error) {
            console.error("Error fetching available subjects:", error);
            throw new Error("Could not fetch available subjects");
        }
    }

    static async registerForSubject(studentId: number, subjectId: number) {
        try {
            // 1. Find an available AcademicPosition for this subject
            const academicPosition = await AcademicPositionModel.findOne({
                where: { SubjectId: subjectId }
            });

            if (!academicPosition) {
                throw new Error("No academic position found for this subject");
            }

            // 2. Create Registration
            const registration = await Registration.create({
                StudentId: studentId,
                AcademicPositionId: academicPosition.Id
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
                include: [{ model: AcademicPositionModel, include: [Subject] }] // Assuming relations are set up correctly
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
            // Logic: Find subjects the student has passed (regularized) but not yet passed final exam
            // Simplified: Return all upcoming final exams for subjects in student's career
            // Real logic needs 'Regularity' check. For now, we'll list all finals for subjects the student is not yet registered for final.

            const studentCareer = await StudentCareer.findOne({ where: { alumnoId: studentId, state: 'active' } });
            if (!studentCareer) return [];

            const planSubjects = await SubjectPlanModel.findAll({ where: { careerPlanId: studentCareer.PlanCarreraId } });
            const subjectIds = planSubjects.map(ps => ps.asignaturaId);

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
