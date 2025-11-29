import { Request, Response } from "express";
import { ProfessorService } from "./professor-crud.service.js";
import * as Validator from "../middlewares/professor-validator.middleware.js";
import { NextFunction } from "express";
import { Subject } from "../../../shared/models/subject.model.js";

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
  } catch (error) {
    if (error === "ZodError") {
      res.status(400).json({ errors: error });
      console.log("zod");
      console.log(error);
    } else {
      res.status(400).json({ error: error });
    }
  }
};

export const getProfessorSubjects = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const subjects = await service.getProfessorSubjects(id);
    res.status(200).json({ data: subjects });
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

export const searchProfessorById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const professor = await service.searchProfessorById(id);
    if (!professor) {
      res.status(404).json({ error: "Professor not found" });
      return;
    }
    res.status(200).json({ data: professor });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const searchProfessors = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const results = await service.searchProfessors(req.body);
    res.status(200).json({ data: results });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const searchByState = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const state = req.params.state === "true";
    const results = await service.searchByState(state);
    res.status(200).json({ data: results });
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