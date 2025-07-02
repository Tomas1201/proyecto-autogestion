import { create } from 'domain';
import { catchAsync } from '../Utils/catchAsync.js'; 
import { AlumnoService } from "./AlumnoService.js";
import { Request, Response, NextFunction } from 'express';


export const AlumnoController = {
  
  getAlumno: catchAsync(async (req: Request, res: Response, next:NextFunction) => {
    
    const { id } = req.params;
    
    try {
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({status: 400, message: 'Invalid ID format', ERROR_CODE: 400 });
      }
      const alumno = await AlumnoService.getById(Number(id));
      if (!alumno) {
        return res.status(404).json({status: 404, message: 'Alumno not found', ERROR_CODE: 404 });
      }
      res.status(200).json({status: "OK", data: alumno});
        }
         catch (error) {
      console.error('Error buscando alumno:', error);
      res.status(500).json({status:500, message: 'Internal server error' });
    }
  }),



  getAllAlumnos: async (req:Request, res:Response) => {
    
    try {
      const alumnos = await AlumnoService.getAll();
      res.status(200).json({status:"OK", data: alumnos});
    
    } catch (error) {
      console.error('Error buscando alumnos:', error);
      res.status(500).json({status: "500", data:{error:'Internal server error' }});
    }
  },



  getAlumnoByName: catchAsync(async (req: Request, res: Response) => {  
    const { name } = req.params;
    
    
    try {
      const alumnos = await AlumnoService.getByName(name);
      
      if (!alumnos || alumnos.length === 0) {
        return res.status(404).json({status:404, message: 'No alumnos found with that name' });
      }
      res.status(200).json({status:200, data: alumnos});
    } catch (error) {
      console.error('Error fetching alumno by name:', error);
      res.status(500).json({status:500, message: 'Internal server error' });
    }
  }),



  getAlumnoByApellido: catchAsync(async (req: Request, res: Response) => {
    const { apellido } = req.params;

    try {
      const alumnos = await AlumnoService.getByApellido(apellido);
      
      if (!alumnos || alumnos.length === 0) {
        return res.status(404).json({status:404, message: 'No alumnos found with that apellido' });
      }
      res.status(200).json({status:200, data: alumnos});
    } catch (error) {
      console.error('Error fetching alumno by apellido:', error);
      res.status(500).json({status:500, message: 'Internal server error' });
    }
  }),
  
  getByAsignatura: catchAsync(async (req: Request, res: Response) => {
    const {asignatura} = req.params;
    try{
      const alumnos = await AlumnoService.getByAsignatura(asignatura);
     if (!alumnos || alumnos.length === 0) {
        return res.status(404).json({status:404, message: 'No alumnos found with that apellido' });
      }
      res.status(200).json({status:200, data: alumnos});
    } catch (error) {
      console.error('Error fetching alumno by apellido:', error);
      res.status(500).json({status:500, message: 'Internal server error' });
    }
  }),

  getByCarrera: catchAsync(async (req: Request, res: Response) => {
    const {carrera} = req.params;
    try{
      const alumnos = await AlumnoService.getByCarrera(carrera);
     if (!alumnos || alumnos.length === 0) {
        return res.status(404).json({status:404, message: 'No alumnos found with that apellido' });
      }
      res.status(200).json({status:200, data: alumnos});
    } catch (error) {
      console.error('Error fetching alumno by apellido:', error);
      res.status(500).json({status:500, message: 'Internal server error' });
    }
  }),

  createAlumno: async (req: Request, res: Response) => {
    const alumno = req.body;
    try {
      const newAlumno = await AlumnoService.create(alumno);
      res.setHeader('Location', `/api/v1/alumnos/${newAlumno.get('id')}`);
      res.status(201).json({status:201,data: newAlumno});
    } catch (error) {
      console.error('Error creating alumno:', error);
      res.status(500).json({status:500, message: 'Internal server error' });
    }
  },

 createAlumnoAsignatura: catchAsync(async (req: Request, res: Response) => {
    const asignatura  = req.params.asignatura;
    const alumnoid = Number(req.params.id);
    const carreraid = Number(req.params.carreraid);

    try {
      const newinscripcion = await AlumnoService.createAsignaturainscripcion(alumnoid,carreraid ,asignatura);
      res.json({status:201, data: newinscripcion});
    } catch (error) {
      console.error('Error creating alumno inscripcion:', error);
      res.status(500).json({status:500, message: 'Internal server error' });
    }
  }),

  updateAlumno: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const alumno = req.body;
    try {
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({status: 400, message: 'Invalid ID format', ERROR_CODE: 400 });
      }
      const updatedAlumno = await AlumnoService.update(Number(id), alumno);
      if (!updatedAlumno) {
        return res.status(404).json({status:404, message: 'Alumno not found' });
      }
      res.status(200).json({status:200, data: updatedAlumno});
    } catch (error) {
      console.error('Error updating alumno:', error);
      res.status(500).json({status:500, message: 'Internal server error' });
    }
  }),


  /*
  deleteAlumno: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deleted = await AlumnoService.delete(id);
      if (!deleted) {
        return res.status(404).json({status:404, message: 'Alumno not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting alumno:', error);
      res.status(500).json({status:500, message: 'Internal server error' });
    }
  })
  */

};