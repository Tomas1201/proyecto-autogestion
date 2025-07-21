import { Request, Response } from 'express';
import { ProfessorService } from './ProfessorService.js';
import { ProfessorSchema, UpdateProfessorSchema, SearchProfessorSchema } from './ProfessorValidator.js';
import { NextFunction } from 'express';

const service = new ProfessorService();

export const registerProfessor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = ProfessorSchema.parse(req.body);
    const professor = await service.registerProfessor(validatedData);
    res.status(201).json({
      code: 'CREATED',
      message: 'Profesor registrado exitosamente',
      data: professor,
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const registerAsignatura = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = ProfessorSchema.parse(req.body);
    const asignature = await service.registerAsignatura(validatedData);
    res.status(201).json({
      code: 'CREATED',
      message: 'Asignatura registrada exitosamente',
      data: asignature,
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
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
    const validatedData = UpdateProfessorSchema.parse(req.body);
    const id = Number(validatedData.id);
    const updated = await service.updateProfessor(id, validatedData);
    res.status(200).json({
      code: 'UPDATED',
      message: 'Profesor modificado exitosamente',
      data: updated,
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
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
    if (error.name === 'ZodError') {
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
    const state = req.params.state === 'true';
    const results = await service.searchByState(state);
    res.status(200).json({ data: results });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
}


export const searchByName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const results = await service.searchByName(req.params.name);
    res.status(200).json({ data: results });
  } catch (error: any) {
    if (error.name === 'ZodError') {
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
    if (error.lastname === 'ZodError') {
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
    if (error.name === 'ZodError') {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const searchByLegajo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const results = await service.searchByLegajo(req.params.legajo);
    res.status(200).json({ data: results });
  } catch (error: any) {
    if (error.name === 'ZodError') {
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
      code: 'ARCHIVED',
      message: 'Profesor archivado exitosamente',
      data: archivedProfessor,
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
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
      code: 'UNARCHIVED',
      message: 'Profesor desarchivado exitosamente',
      data: archivedProfessor,
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};


