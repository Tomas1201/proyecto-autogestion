import { Request, Response } from "express";
import { CareerSubjectService } from "./career-subject.service.js";

export class CareerSubjectController {
  private service = new CareerSubjectService();

  public async addSubjectToPlan(req: Request, res: Response): Promise<void> {
    try {
      const { careerPlanId } = req.params;
      const subjectData = req.body;

      // Basic validation
      if (!subjectData.subjectId || !subjectData.year || !subjectData.workload) {
        res.status(400).json({ message: "Missing required fields in body (subjectId, year, workload)" });
        return;
      }

      const result = await this.service.addSubjectToPlan(careerPlanId, subjectData);
      res.status(201).json({ message: "Subject added to plan successfully", data: result });
    } catch (error: any) {
      if (error.message.includes("not found")) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error adding subject to plan", error: error.message });
      }
    }
  }

  public async getSubjectsByCareer(req: Request, res: Response): Promise<void> {
    try {
      const { careerId } = req.params;
      const result = await this.service.getSubjectsByCareer(careerId);
      res.status(200).json(result);
    } catch (error: any) {
       if (error.message.includes("not found")) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error retrieving subjects from career", error: error.message });
      }
    }
  }

  public async removeSubjectFromPlan(req: Request, res: Response): Promise<void> {
    try {
      const { subjectPlanId } = req.params;
      await this.service.removeSubjectFromPlan(parseInt(subjectPlanId, 10));
      res.status(200).json({ message: "Subject removed from plan successfully" });
    } catch (error: any) {
      if (error.message.includes("not found")) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error removing subject from plan", error: error.message });
      }
    }
  }
}
