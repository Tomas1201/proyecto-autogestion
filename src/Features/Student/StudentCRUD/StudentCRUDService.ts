import {StudentRepository} from './StudentCRUDRepository.js';   
import { Student } from '../../../Shared/Models/StudentModel.js'; 
import { StudentDTO } from '../StudentValidationMiddleware.js';
import type { StudentInterface } from './StudentCRUDInterface.js';



export class StudentService {
constructor(private StudentRepositoryI: StudentInterface) {}

 async getById(id: number) {
    try {
      const alumno = await this.StudentRepositoryI.FindById(id);
      return alumno;
    } catch (error) {
      console.error('Error fetching alumno by ID:', error);
      throw new Error('Database error');
    }

    }


  async getAll() {
    try {
      const alumnos = await this.StudentRepositoryI.FindAll();
      return alumnos;
    } catch (error) {
      console.error('Error fetching all alumnos:', error);
      throw new Error('Database error');
    }
  }


 

  async Create(StudentData: Student) {
    try {
      const newAlumno = await this.StudentRepositoryI.Create(StudentData);
      return newAlumno;
    } catch (error) {
      console.error('Error creating alumno:', error);
      throw new Error('Database error');
    }
  }

  async update(id: number, alumnoData: Student) {
    try {
      const updated = await this.StudentRepositoryI.Update(id, alumnoData);
      if (!updated) {
        throw new Error('Student not found or not updated');
      }
      return updated;
    } catch (error) {
      console.error('Error updating alumno:', error);
      throw new Error('Database error');
    }
  }

  
}