import { Request, Response } from "express";
import { AttendanceService } from "./attendance.service.js";

export class AttendanceController {
  private service = new AttendanceService();

  public async saveAttendance(req: Request, res: Response): Promise<void> {
    try {
      const { subjectId, date, students } = req.body;
      if (!subjectId || !date || !students) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }
      await this.service.saveAttendance({ subjectId, date, students });
      res.status(201).json({ message: "Attendance saved successfully" });
    } catch (error: any) {
      res.status(500).json({ message: "Error saving attendance", error: error.message });
    }
  }

  public async getAttendance(req: Request, res: Response): Promise<void> {
    try {
      const { subjectId, date } = req.params;
      const result = await this.service.getAttendanceBySubject(subjectId, date);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: "Error retrieving attendance", error: error.message });
    }
  }
}
