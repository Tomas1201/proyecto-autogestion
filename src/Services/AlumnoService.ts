import {AlumnoRepository} from '../Repositories/AlumnoRepository.js';   
import { Alumno } from '../Models/AlumnoModel.js'; 

const alumnoRepository = AlumnoRepository.getInstance();

export const AlumnoService = {

  getById: async (id: number) => {
    try {
      const alumno = await alumnoRepository.findById(id);
      return alumno;
    } catch (error) {
      console.error('Error fetching alumno by ID:', error);
      throw new Error('Database error');
    }

    },


  getAll: async () => {
    try {
      const alumnos = await alumnoRepository.findAll();
      return alumnos;
    } catch (error) {
      console.error('Error fetching all alumnos:', error);
      throw new Error('Database error');
    }
  },


  getByName: async (name: string) => {
    try {
      const alumnos = await alumnoRepository.findByName(name);
      return alumnos;
    } catch (error) {
      console.error('Error fetching alumno by name:', error);
      throw new Error('Database error');
    }
  },


  getByApellido: async (apellido: string) => {
    try {
      const alumnos = await alumnoRepository.findByApellido(apellido);
      return alumnos;
    } catch (error) {
      console.error('Error fetching alumno by apellido:', error);
      throw new Error('Database error');}
    },
 
    getByAsignatura: async (asignatura: string) => {
      try{
        const alumnos = await alumnoRepository.findByAsignatura(asignatura);
        return alumnos;
      }catch (error){
        console.error('Error fetching alumno by apellido:', error);
      throw new Error('Database error');}
      
    },

 getByCarrera: async (carrera: string) => {
      try{
        const alumnos = await alumnoRepository.findByCarrera(carrera);
        return alumnos;
      }catch (error){
        console.error('Error fetching alumno by apellido:', error);
      throw new Error('Database error');}
      
    },

  create: async (alumnoData: Alumno) => {
    try {
      const newAlumno = await alumnoRepository.create(alumnoData);
      return newAlumno;
    } catch (error) {
      console.error('Error creating alumno:', error);
      throw new Error('Database error');
    }
  },

  createAsignaturainscripcion: async (alumnoid: number,carreraid: number, asignatura: string) => {
    try {
      const newInscripcion = await alumnoRepository.createAsignaturaInscripcion(alumnoid,carreraid, asignatura);
      return newInscripcion;
    }catch (error) {
      console.error('Error creating alumno inscripcion:', error);
      throw new Error('Database error');
    }
  },

  update: async (id: number, alumnoData: Alumno) => {
    try {
      const updated = await alumnoRepository.update(id, alumnoData);
      if (!updated) {
        throw new Error('Alumno not found or not updated');
      }
      return updated;
    } catch (error) {
      console.error('Error updating alumno:', error);
      throw new Error('Database error');
    }
  },

  /*
  delete: async (id: string) => {
    try {
      const deleted = await AlumnoRepository.delete(id);
      if (!deleted) {
        throw new Error('Alumno not found or not deleted');
      }
      return deleted;
    } catch (error) {
      console.error('Error deleting alumno:', error);
      throw new Error('Database error');
    }
  }
  */  
 
}