import { Request, Response } from "express";
import { RegistrationService } from "./registration.service.js";
import { CreateRegistrationSchema, UpdateRegistrationSchema } from "./middlewares/registration-validator.middleware.js";

export class RegistrationController {
  private service = new RegistrationService();

  public async createRegistration(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = CreateRegistrationSchema.parse(req.body);

      const result = await this.service.createRegistration(validatedData.studentId, validatedData.academicPositionId);
      res.status(201).json({ message: "Registration successful", data: result });
    } catch (error) {
      if (error === "ZodError") {
        res.status(400).json({ errors: error });
      } else if (error ) {
        res.status(404).json({ message: error });
      } else if (error) {
        res.status(409).json({ message: error });
      }
      else {
        res.status(500).json({ message: "Error creating registration", error: error});
      }
    }
  }

  public async getStudentRegistrations(req: Request, res: Response): Promise<void> {
    try {
      const { studentId } = req.params;
      const result = await this.service.getStudentRegistrations(studentId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving registrations", error: error });
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
    } catch (error) {
      res.status(500).json({ message: "Error deleting registration", error: error });
    }
  }
  public async updateRegistration(req: Request, res: Response): Promise<void> {
    try {
      const { registrationId } = req.params;
      const validatedData = UpdateRegistrationSchema.parse(req.body);

      await this.service.updateRegistration(registrationId, validatedData.status, validatedData.grade);
      res.status(200).json({ message: "Registration updated successfully" });
    } catch (error) {
      if (error === "ZodError") {
        res.status(400).json({ errors: error });
      } else if (error === "Registration not found") {
        res.status(404).json({ message: error });
      } else {
        res.status(500).json({ message: "Error updating registration", error: error });
      }
    }
  }

  public async getRegistrationsBySubject(req: Request, res: Response): Promise<void> {
    try {
      const { subjectId } = req.params;
      const result = await this.service.getRegistrationsBySubject(subjectId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving registrations", error: error });
    }
  }
}
