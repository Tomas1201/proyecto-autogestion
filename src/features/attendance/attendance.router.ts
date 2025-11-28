import { Router } from "express";
import { AttendanceController } from "./attendance.controller.js";

export const attendanceRouter = Router();
const controller = new AttendanceController();

attendanceRouter.post("/", (req, res) => controller.saveAttendance(req, res));
attendanceRouter.get("/subject/:subjectId/date/:date", (req, res) => controller.getAttendance(req, res));
