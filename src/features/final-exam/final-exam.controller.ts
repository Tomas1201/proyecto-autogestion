import { Request, Response } from "express";
import { FinalExamService } from "./final-exam.service.js";

export class FinalExamController {
  private service = new FinalExamService();

  public async getExamsBySubject(req: Request, res: Response): Promise<void> {
    try {
      const { subjectId } = req.params;
      const result = await this.service.getExamsBySubject(subjectId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: "Error retrieving exams", error: error.message });
    }
  }

  public async getExamRegistrations(req: Request, res: Response): Promise<void> {
    try {
      const finalExamId = Number(req.params.finalExamId);
      const result = await this.service.getExamRegistrations(finalExamId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: "Error retrieving registrations", error: error.message });
    }
  }

  public async updateGrade(req: Request, res: Response): Promise<void> {
    try {
      const registrationId = Number(req.params.registrationId);
      const { grade, status } = req.body;
      await this.service.updateGrade(registrationId, grade, status);
      res.status(200).json({ message: "Grade updated successfully" });
    } catch (error: any) {
      res.status(500).json({ message: "Error updating grade", error: error.message });
    }
  }
  
  public async createExam(req: Request, res: Response): Promise<void> {
      try {
          const result = await this.service.createExam(req.body);
          res.status(201).json(result);
      } catch (error: any) {
          res.status(500).json({ message: "Error creating exam", error: error.message });
      }
  }
}
