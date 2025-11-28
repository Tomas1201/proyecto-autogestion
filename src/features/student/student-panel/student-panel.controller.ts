import { Request, Response } from "express";
import { StudentPanelService } from "./student-panel.service.js";
import { decodeToken } from "../../../shared/services/jwt.service.js";
import { Student } from "../../../shared/models/student.model.js";

export const StudentPanelController = {

    getCareers: async (req: Request, res: Response) => {
        try {
          const {file} = req.body

            const careers = await StudentPanelService.getCareers(file);
            res.status(200).json({ status: "OK", data: careers });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    getAvailableSubjects: async (req: Request, res: Response) => {
        try {
            const {file} = req.body;

            const subjects = await StudentPanelService.getAvailableSubjects(file);
            res.status(200).json({ status: "OK", data: subjects });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    registerForSubject: async (req: Request, res: Response) => {
        try {
            const {file} = req.body;
            const { subjectId } = req.body;

            if (!subjectId) {
                res.status(400).json({ message: "Subject ID is required" });
                return;
            }

            const result = await StudentPanelService.registerForSubject(Number(file), Number(subjectId));
            res.status(201).json(result);
        } catch (error) {
            console.error("Error in registerForSubject:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getAttendance: async (req: Request, res: Response) => {
        try {
            const {file} = req.body;

            const student = await Student.findOne({ where: { file: file } });
            if (!student) {
                res.status(404).json({ message: "Student not found" });
                return;
            }

            const result = await StudentPanelService.getAttendance(Number(student.id));

            res.json(result);
        } catch (error) {
            console.error("Error in getAttendance:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getGrades: async (req: Request, res: Response) => {
        try {
            const {file} = req.body;
            const student = await Student.findOne({ where: { file: file } });
            if (!student) {
                res.status(404).json({ message: "Student not found" });
                return;
            }

            const result = await StudentPanelService.getGrades(Number(student.id));
            res.json(result);
        } catch (error) {
            console.error("Error in getGrades:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getAvailableFinalExams: async (req: Request, res: Response) => {
        try {
            const {file} = req.body;
            const student = await Student.findOne({ where: { file: file } });
            if (!student) {
                res.status(404).json({ message: "Student not found" });
                return;
            }

            const result = await StudentPanelService.getAvailableFinalExams(Number(student.id));
            res.json(result);
        } catch (error) {
            console.error("Error in getAvailableFinalExams:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    registerForFinalExam: async (req: Request, res: Response) => {
        try {
            const {file} = req.body;
            const student = await Student.findOne({ where: { file: file } });
            if (!student) {
                res.status(404).json({ message: "Student not found" });
                return;
            }
            const { finalExamId } = req.body;

            const result = await StudentPanelService.registerForFinalExam(Number(student.id), finalExamId);
            res.status(201).json(result);
        } catch (error) {
            console.error("Error in registerForFinalExam:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};
