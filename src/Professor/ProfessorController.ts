import { catchAsync } from '../Utils/catchAsync.js'; 
import { ProfessorService } from "../Professor/ProfessorService.js";
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const ProfessorController = {
  getProfessor: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({status: 400, message: 'Invalid ID format'});
    }
    const professor = await ProfessorService.getById(Number(id));
    if (!professor) {
      return res.status(404).json({status: 404, message: 'Professor not found'});
    }
    res.status(200).json({status: "OK", data: professor});
  }),

  getAllProfessors: catchAsync(async (req: Request, res: Response) => {
    const professors = await ProfessorService.getAll();
    res.status(200).json({status:"OK", data: professors});
  }),

  getProfessorByName: catchAsync(async (req: Request, res: Response) => {  
    const { name } = req.params;
    const professors = await ProfessorService.getByName(name);
    if (!professors || professors.length === 0) {
      return res.status(404).json({status:404, message: 'No professors found with that name'});
    }
    res.status(200).json({status:200, data: professors});
  }),

  getProfessorByApellido: catchAsync(async (req: Request, res: Response) => {
    const { apellido } = req.params;
    const professors = await ProfessorService.getByApellido(apellido);
    if (!professors || professors.length === 0) {
      return res.status(404).json({status:404, message: 'No professors found with that apellido'});
    }
    res.status(200).json({status:200, data: professors});
  }),

  getProfessorByDni: catchAsync(async (req: Request, res: Response) => {
    const { dni } = req.params;
    const professor = await ProfessorService.getByDni(dni);
    if (!professor) {
      return res.status(404).json({status:404, message: 'Professor not found'});
    }
    res.status(200).json({status:200, data: professor});
  }),

  getProfessorByLegajo: catchAsync(async (req: Request, res: Response) => {
    const { legajo } = req.params;
    const professor = await ProfessorService.getByLegajo(Number(legajo));
    if (!professor) {
      return res.status(404).json({status:404, message: 'Professor not found'});
    }
    res.status(200).json({status:200, data: professor});
  }),
  
  createProfessor: catchAsync(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const professor = req.body;
    const newProfessor = await ProfessorService.create(professor);
    res.setHeader('Location', `/api/v1/professors/${newProfessor.id}`);
    res.status(201).json({status:201, data: newProfessor});
  }),

  updateProfessor: catchAsync(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({status: 400, message: 'Invalid ID format'});
    }
    
    const professor = req.body;
    const updated = await ProfessorService.update(Number(id), professor);
    if (!updated) {
      return res.status(404).json({status:404, message: 'Professor not found'});
    }
    
    const updatedProfessor = await ProfessorService.getById(Number(id));
    res.status(200).json({status:200, data: updatedProfessor});
  }),

  archiveProfessor: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({status: 400, message: 'Invalid ID format'});
    }
    
    const hasAssignments = await ProfessorService.hasActiveAssignments(Number(id));
    if (hasAssignments) {
      return res.status(400).json({ 
        status: 400, 
        message: 'Cannot archive professor with active assignments' 
      });
    }
    
    const archived = await ProfessorService.archive(Number(id));
    if (!archived) {
      return res.status(404).json({status:404, message: 'Professor not found'});
    }
    res.status(200).json({status:200, message: 'Professor archived successfully'});
  })
}

  //Agregado para archivar un profesor


  /*
  deleteProfessor: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deleted = await ProfessorService.delete(id);
      if (!deleted) {
        return res.status(404).json({status:404, message: 'Professor not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting professor:', error);
      res.status(500).json({status:500, message: 'Internal server error' });
    }
  })
  */

