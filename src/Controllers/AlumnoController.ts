import { catchAsync } from '../Utils/catchAsync.js'; 
import { AlumnoService } from "../Services/AlumnoService.js";
import { Request, Response, NextFunction } from 'express';


export const AlumnoController = {
  // Methods for handling requests related to Alumnos
  getAlumno: catchAsync(async (req: Request, res: Response, next:NextFunction) => {
    const { id } = req.params;
    try {
      const alumno = await AlumnoService.getById(id);
      if (!alumno) {
        return res.status(404).json({ message: 'Alumno not found' });
      }
      res.status(200).json(alumno);
    } catch (error) {
      console.error('Error fetching alumno:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }),
  getAllAlumnos: async (req:Request, res:Response) => {
    try {
      const alumnos = await AlumnoService.getAll();
      res.status(200).json(alumnos);
    } catch (error) {
      console.error('Error fetching alumnos:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  getAlumnoByName: catchAsync(async (req: Request, res: Response) => {
    const { name } = req.params;
    console.log('Received request to get alumno by name:', name);
    try {
      const alumnos = await AlumnoService.getByName(name);
      
      if (!alumnos || alumnos.length === 0) {
        return res.status(404).json({ message: 'No alumnos found with that name' });
      }
      res.status(200).json(alumnos);
    } catch (error) {
      console.error('Error fetching alumno by name:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }),
  getAlumnoByApellido: catchAsync(async (req: Request, res: Response) => {
    const { apellido } = req.params;
    console.log('Received request to get alumno by apellido:', apellido);
    try {
      const alumnos = await AlumnoService.getByApellido(apellido);
      
      if (!alumnos || alumnos.length === 0) {
        return res.status(404).json({ message: 'No alumnos found with that apellido' });
      }
      res.status(200).json(alumnos);
    } catch (error) {
      console.error('Error fetching alumno by apellido:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })
  ,
  
  createAlumno: async (req: Request, res: Response) => {
    const alumno = req.body;
    try {
      const newAlumno = await AlumnoService.create(alumno);
      res.status(201).json(newAlumno);
    } catch (error) {
      console.error('Error creating alumno:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  updateAlumno: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const alumno = req.body;
    try {
      const updatedAlumno = await AlumnoService.update(id, alumno);
      if (!updatedAlumno) {
        return res.status(404).json({ message: 'Alumno not found' });
      }
      res.status(200).json(updatedAlumno);
    } catch (error) {
      console.error('Error updating alumno:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }),
  deleteAlumno: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deleted = await AlumnoService.delete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Alumno not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting alumno:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })
};