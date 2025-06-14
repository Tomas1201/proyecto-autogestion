import {AlumnoRepository} from './AlumnoRepository.js';   
import { Alumno } from './AlumnoModel.js'; 

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
 

  create: async (alumnoData: Alumno) => {
    try {
      const newAlumno = await alumnoRepository.create(alumnoData);
      return newAlumno;
    } catch (error) {
      console.error('Error creating alumno:', error);
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