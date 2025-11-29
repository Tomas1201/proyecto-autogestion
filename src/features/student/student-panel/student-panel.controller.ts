import { Request, Response } from "express";
import { StudentPanelService } from "./student-panel.service.js";
import { decodeToken } from "../../../shared/services/jwt.service.js";
import { Student } from "../../../shared/models/student.model.js";

export const StudentPanelController = {

    getCareers: async (req: Request, res: Response) => {
        try {
          const {studentId} = req.params;

            const careers = await StudentPanelService.getCareers(studentId);
            res.status(200).json({ status: "OK", data: careers });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    getAvailableSubjects: async (req: Request, res: Response) => {
        try {
            const {studentId} = req.params;

            const subjects = await StudentPanelService.getAvailableSubjects(studentId);
            res.status(200).json({ status: "OK", data: subjects });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    registerForSubject: async (req: Request, res: Response) => {
        try {
            const {studentId} = req.params;
            const { subjectId } = req.params;

            if (!subjectId) {
                res.status(400).json({ message: "Subject ID is required" });
                return;
            }

            const result = await StudentPanelService.registerForSubject(studentId, subjectId);
            res.status(201).json(result);
        } catch (error) {
            console.error("Error in registerForSubject:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getAttendance: async (req: Request, res: Response) => {
        try {
            const {studentId} = req.params;

            const student = await Student.findOne({ where: { file: studentId } });
            if (!student) {
                res.status(404).json({ message: "Student not found" });
                return;
            }

            const result = await StudentPanelService.getAttendance(student.id);

            res.json(result);
        } catch (error) {
            console.error("Error in getAttendance:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getGrades: async (req: Request, res: Response) => {
        try {
            const {studentId} = req.params;
            const student = await Student.findOne({ where: { id: studentId } });
            if (!student) {
                res.status(404).json({ message: "Student not found" });
                return;
            }

            const result = await StudentPanelService.getGrades(studentId);
            res.json(result);
        } catch (error) {
            console.error("Error in getGrades:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getAvailableFinalExams: async (req: Request, res: Response) => {
        try {
            const {studentId} = req.params;
            const student = await Student.findOne({ where: { id: studentId } });
            if (!student) {
                res.status(404).json({ message: "Student not found" });
                return;
            }

            const result = await StudentPanelService.getAvailableFinalExams(studentId);
            res.json(result);
        } catch (error) {
            console.error("Error in getAvailableFinalExams:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    registerForFinalExam: async (req: Request, res: Response) => {
        try {
            const {studentId} = req.params;
            const student = await Student.findOne({ where: { id: studentId } });
            if (!student) {
                res.status(404).json({ message: "Student not found" });
                return;
            }
            const { finalExamId } = req.body;

            const result = await StudentPanelService.registerForFinalExam(student.id, finalExamId);
            res.status(201).json(result);
        } catch (error) {
            console.error("Error in registerForFinalExam:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};
