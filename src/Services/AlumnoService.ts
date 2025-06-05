import { get } from 'http';
import {AlumnoRepository} from '../Repositories/AlumnoRepository.js';   
import { Alumno } from '../Models/AlumnoModel.js'; // Assuming Alumno is a type or interface representing the model

export const AlumnoService = {

  getById: async (id: string) => {
    try {
      const alumno = await AlumnoRepository.findByPk(id);
      return alumno;
    } catch (error) {
      console.error('Error fetching alumno by ID:', error);
      throw new Error('Database error');
    }

    },
  getAll: async () => {
    try {
      const alumnos = await AlumnoRepository.findAll();
      return alumnos;
    } catch (error) {
      console.error('Error fetching all alumnos:', error);
      throw new Error('Database error');
    }
  },
  getByName: async (name: string) => {
    try {
      const alumnos = await AlumnoRepository.findByName(name);
      return alumnos;
    } catch (error) {
      console.error('Error fetching alumno by name:', error);
      throw new Error('Database error');
    }
  }
  ,
 
  create: async (alumnoData: Alumno) => {
    try {
      const newAlumno = await AlumnoRepository.create(alumnoData);
      return newAlumno;
    } catch (error) {
      console.error('Error creating alumno:', error);
      throw new Error('Database error');
    }
  },
  update: async (id: string, alumnoData: Alumno) => {
    try {
      const updated = await AlumnoRepository.update(id, alumnoData);
      if (!updated) {
        throw new Error('Alumno not found or not updated');
      }
      return updated;
    } catch (error) {
      console.error('Error updating alumno:', error);
      throw new Error('Database error');
    }
  },
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
}