import { Request, Response } from "express";
import { ProfessorService } from "../professor-crud/professor-crud.service.js";
import { NextFunction } from "express";

const service = new ProfessorService();

export const searchByName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const results = await service.searchByName(req.params.name);
    res.status(200).json({ data: results });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const searchByLastName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const results = await service.searchByLastName(req.params.lastname);
    res.status(200).json({ data: results });
  } catch (error: any) {
    if (error.lastname === "ZodError") {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const searchByDni = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const results = await service.searchByDni(req.params.dni);
    res.status(200).json({ data: results });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const searchByFileNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const results = await service.searchByFileNumber(req.params.fileNumber);
    res.status(200).json({ data: results });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};
