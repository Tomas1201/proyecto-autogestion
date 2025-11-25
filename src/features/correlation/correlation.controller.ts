import { Request, Response } from "express";
import { CorrelationService } from "./correlation.service.js";

export class CorrelationController {
  private service = new CorrelationService();

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      if (!data.careerId || !data.subjectToTake || !data.subjectRequiedId) {
        res.status(400).json({ message: "Missing required fields: careerId, subjectToTake, subjectRequiedId" });
        return;
      }
      const result = await this.service.create(data);
      res.status(201).json({ message: "Correlation created successfully", data: result });
    } catch (error: any) {
      if (error.message.includes("not found")) {
        res.status(404).json({ message: error.message });
      } else if (error.message.includes("prerequisite of itself")) {
        res.status(409).json({ message: error.message });
      }
      else {
        res.status(500).json({ message: "Error creating correlation", error: error.message });
      }
    }
  }

  public async findByCareer(req: Request, res: Response): Promise<void> {
    try {
      const { careerId } = req.params;
      const result = await this.service.findByCareer(careerId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: "Error retrieving correlations", error: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { correlationId } = req.params;
      await this.service.delete(parseInt(correlationId, 10));
      res.status(200).json({ message: "Correlation deleted successfully" });
    } catch (error: any) {
      if (error.message.includes("not found")) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error deleting correlation", error: error.message });
      }
    }
  }
}
