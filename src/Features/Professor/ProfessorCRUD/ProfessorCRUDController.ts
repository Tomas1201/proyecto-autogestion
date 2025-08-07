import { Request, Response } from "express";
import { ProfessorService } from "./ProfessorCRUDService.js";
import * as Validator from "../../../Professor/ProfessorValidatorMiddleware.js";
import { NextFunction } from "express";
import { Subject } from "../../../Shared/Models/SubjectModel.js";

const service = new ProfessorService();

export const registerProfessor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = Validator.ProfessorSchema.parse(req.body);
    const professor = await service.registerProfessor(validatedData);
    res.status(201).json({
      code: "CREATED",
      message: "Professor registered successfully",
      data: professor,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const registerProfessorToSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = Validator.SearchProfessorSchema.parse(req.body);
    const registration = await service.registerProfessorToSubject(
      validatedData
    );
    res.status(201).json({
      code: "CREATED",
      message: "Professor assigned to subject successfully",
      data: registration,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const updateProfessor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = Validator.UpdateProfessorSchema.parse(req.body);
    const id = Number(validatedData.id);
    const updated = await service.updateProfessor(id, validatedData);
    res.status(200).json({
      code: "UPDATED",
      message: "Professor updated successfully",
      data: updated,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};


export const archiveProfessor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const archivedProfessor = await service.archiveProfessor(id);
    res.status(200).json({
      code: "ARCHIVED",
      message: "Professor archived successfully",
      data: archivedProfessor,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const unarchiveProfessor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const archivedProfessor = await service.unarchiveProfessor(id);
    res.status(200).json({
      code: "UNARCHIVED",
      message: "Professor unarchived successfully",
      data: archivedProfessor,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};