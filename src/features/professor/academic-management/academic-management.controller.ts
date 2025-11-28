import { Request, Response } from 'express';
import { Attendance } from '../../../shared/models/domain/attendance.model.js';
import { Exam } from '../../../shared/models/domain/exam.model.js';
import { Grade } from '../../../shared/models/domain/grade.model.js';
import { FinalExam } from '../../../shared/models/domain/final-exam.model.js';
import { FinalExamRegistration } from '../../../shared/models/domain/final-exam-registration.model.js';
import { Student } from '../../../shared/models/student.model.js';

export class AcademicManagementController {

    // Attendance
    static async recordAttendance(req: Request, res: Response) {
        try {
            const { academicPositionId, date, students } = req.body;
            // students: [{ studentId, isPresent, observations }]

            const attendanceRecords = await Promise.all(students.map(async (s: any) => {
                return Attendance.create({
                    academicPositionId,
                    date,
                    studentId: s.studentId,
                    isPresent: s.isPresent,
                    observations: s.observations
                });
            }));

            res.status(201).json({ message: 'Attendance recorded', count: attendanceRecords.length });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error recording attendance' });
        }
    }

    // Exams
    static async createExam(req: Request, res: Response) {
        try {
            const { academicPositionId, date, description, type } = req.body;
            const exam = await Exam.create({ academicPositionId, date, description, type });
            res.status(201).json(exam);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating exam' });
        }
    }

    // Grades
    static async recordGrades(req: Request, res: Response) {
        try {
            const { examId, grades } = req.body;
            // grades: [{ studentId, value, feedback }]

            const gradeRecords = await Promise.all(grades.map(async (g: any) => {
                return Grade.create({
                    examId,
                    studentId: g.studentId,
                    value: g.value,
                    feedback: g.feedback
                });
            }));

            res.status(201).json({ message: 'Grades recorded', count: gradeRecords.length });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error recording grades' });
        }
    }

    // Final Exams
    static async createFinalExam(req: Request, res: Response) {
        try {
            const { subjectId, date, professorId, classroom } = req.body;
            const finalExam = await FinalExam.create({ subjectId, date, professorId, classroom });
            res.status(201).json(finalExam);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating final exam' });
        }
    }

    static async gradeFinalExam(req: Request, res: Response) {
        try {
            const { finalExamId, grades } = req.body;
            // grades: [{ studentId, grade, state, feedback }]

            const updates = await Promise.all(grades.map(async (g: any) => {
                const registration = await FinalExamRegistration.findOne({
                    where: { finalExamId, studentId: g.studentId }
                });
                if (registration) {
                    registration.grade = g.grade;
                    registration.state = g.state; // 'passed', 'failed', 'absent'
                    registration.feedback = g.feedback;
                    await registration.save();
                    return registration;
                }
                return null;
            }));

            res.status(200).json({ message: 'Final exams graded' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error grading final exams' });
        }
    }
}
