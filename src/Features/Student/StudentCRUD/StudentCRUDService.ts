import {StudentRepository} from './StudentCRUDRepository.js';   
import { Student } from '../../../Shared/Models/StudentModel.js'; 
import { StudentDTO } from '../StudentValidationMiddleware.js';

const StudentRepositoryI = StudentRepository.getInstance();

export const StudentService = {

  getById: async (id: string) => {
    try {
      const alumno = await StudentRepositoryI.FindById(id);
      return alumno;
    } catch (error) {
      console.error('Error fetching alumno by ID:', error);
      throw new Error('Database error');
    }

    },


  getAll: async () => {
    try {
      const alumnos = await StudentRepositoryI.FindAll();
      return alumnos;
    } catch (error) {
      console.error('Error fetching all alumnos:', error);
      throw new Error('Database error');
    }
  },


 

  Create: async (StudentData: Student) => {
    try {
      const newAlumno = await StudentRepositoryI.Create(StudentData);
      return newAlumno;
    } catch (error) {
      console.error('Error creating alumno:', error);
      throw new Error('Database error');
    }
  },

  CreateSubjectRegistration: async (alumnoid: number, asignaturaid: number) => {
    try {
      const newInscripcion = await StudentRepositoryI.CreateSubjectRegistration(alumnoid, asignaturaid);
      return newInscripcion;
    }catch (error) {
      console.error('Error creating alumno inscripcion:', error);
      throw new Error('Database error');
    }
  },

  update: async (id: number, alumnoData: Student) => {
    try {
      const updated = await StudentRepositoryI.Update(id, alumnoData);
      if (!updated) {
        throw new Error('Student not found or not updated');
      }
      return updated;
    } catch (error) {
      console.error('Error updating alumno:', error);
      throw new Error('Database error');
    }
  },

  changeStatus: async (id: number, status: string) => {
    try {
      const updated = await StudentRepositoryI.ChangeStatus(id, status);
      if (!updated) { 
        throw new Error('Student not found or not updated');
      }
      return updated;
    } catch (error) {
      console.error('Error changing alumno status:', error);
        return;
      }
    },

  /*
  delete: async (id: string) => {
    try {
      const deleted = await AlumnoRepository.delete(id);
      if (!deleted) {
        throw new Error('Student not found or not deleted');
      }
      return deleted;
    } catch (error) {
      console.error('Error deleting alumno:', error);
      throw new Error('Database error');
    }
  }
  */  
 
}