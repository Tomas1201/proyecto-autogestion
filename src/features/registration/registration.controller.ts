import { Request, Response } from "express";
import { RegistrationService } from "./registration.service.js";

export class RegistrationController {
  private service = new RegistrationService();

  public async createRegistration(req: Request, res: Response): Promise<void> {
    try {
      const { studentId, academicPositionId } = req.body;

      if (!studentId || !academicPositionId) {
        res.status(400).json({ message: "Missing studentId or academicPositionId in body" });
        return;
      }

      const result = await this.service.createRegistration(studentId, academicPositionId);
      res.status(201).json({ message: "Registration successful", data: result });
    } catch (error: any) {
      if (error.message.includes("not found") || error.message.includes("not enrolled")) {
        res.status(404).json({ message: error.message });
      } else if (error.message.includes("Prerequisite not met") || error.message.includes("already enrolled") || error.message.includes("already passed")) {
        res.status(409).json({ message: error.message }); // 409 Conflict
      }
      else {
        res.status(500).json({ message: "Error creating registration", error: error.message });
      }
    }
  }

  public async getStudentRegistrations(req: Request, res: Response): Promise<void> {
    try {
      const { studentId } = req.params;
      const result = await this.service.getStudentRegistrations(studentId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: "Error retrieving registrations", error: error.message });
    }
  }

  public async deleteRegistration(req: Request, res: Response): Promise<void> {
    try {
      const { registrationId } = req.params;
      const result = await this.service.deleteRegistration(registrationId);
      if (result === 0) {
        res.status(404).json({ message: "Registration not found" });
        return;
      }
      res.status(200).json({ message: "Registration deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: "Error deleting registration", error: error.message });
    }
  }
}
