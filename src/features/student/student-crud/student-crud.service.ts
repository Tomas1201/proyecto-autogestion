import { StudentRepository } from './student-crud.repository.js';
import { Student } from '../../../shared/models/student.model.js';
import { Registration } from '../../../shared/models/domain/registration.model.js';
import { AcademicPositionModel } from '../../../shared/models/domain/academic-position.model.js';

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
    } catch (error) {
      console.error('Error creating alumno inscripcion:', error);
      throw new Error('Database error');
    }
  },

  registerStudentToSubject: async (data: any) => {
    console.log("Data received for student subject assignment:", data);
    if (!data.studentId || !data.subjectId) {
      throw new Error("studentId and subjectId are required");
    }

    
    const academicPosition = await AcademicPositionModel.findOne({
      where: { subjectId: data.subjectId }
    });

    if (!academicPosition) {
      throw new Error("No academic position found for this subject");
    }

    const existing = await Registration.findOne({
      where: { studentId: data.studentId, academicPositionId: academicPosition.id },
    });

    if (existing) {
      throw new Error("Student already assigned to this subject (Academic Position)");
    }

    return await Registration.create({
      studentId: data.studentId,
      academicPositionId: academicPosition.id,
      status: data.status || 'ENROLLED'
    });
  },

  update: async (id: string, alumnoData: Student) => {
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

  changeStatus: async (id: string, status: string) => {
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

}