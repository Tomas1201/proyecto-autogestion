import { Op } from "sequelize";
import { Student } from "../../../Shared/Models/StudentModel.js";
import { StudentInterface } from "./StudentCRUDInterface.js";
import { Registration } from "../../../Shared/Models/Domain/RegistrationModel.js";
import { SequelizeDB } from "../../../Database/Sequelize.js"; // Importar el modelo de inscriptos si es necesario
import { AcademicPositionModel } from "../../../Shared/Models/Domain/AcademicPositionModel.js";

export class StudentRepository implements StudentInterface {
  static instance: StudentRepository;
  static getInstance(): StudentRepository {
    if (!StudentRepository.instance) {
      StudentRepository.instance = new StudentRepository();
    }
    return StudentRepository.instance;
  }
  constructor() {}
  
  

  async FindById(id: string): Promise<Student | null> {
    try {
      const alumno = await Student.findByPk(id);
      return alumno ? (alumno as Student) : null;
    } catch (error) {
      console.error("Error fetching alumno by ID:", error);
      throw new Error("Database error");
    }
  }

  async FindAll(): Promise<Student[]> {
    try {
      const alumnos = await Student.findAll();
      return alumnos ? (alumnos as Student[]) : [];
      // condicion ? true : false
    } catch (error) {
      console.error("Error fetching all alumnos:", error);
      throw new Error("Database error");
    }
  }


  // Devuelve un alumno por apellido

 

  // Crea un nuevo alumno
  async Create(alumnoData: Student): Promise<Student | null> {
    try {
      const existingAlumno = await Student.findOne({
        where: {
          [Op.or]: [
            { Email: alumnoData.Email },
            { Dni: alumnoData.Dni },
            { File: alumnoData.File },
          ],
        },
      });
      if (existingAlumno) {
        console.error(
          "Student with the same email, dni or legajo already exists"
        );
        return null; // O lanzar un error según tu lógica
      }
      const newAlumno = await Student.create(alumnoData as any);
      return newAlumno as Student;
    } catch (error) {
      console.error("Error creating alumno:", error);
      return null; // O puedes lanzar un error según tu lógica
      throw new Error("Database error");
    }
  }

  CreateSubjectRegistration = async (
    alumnoid: number,
    asignatura_id: number
  ): Promise<any> => {
    try {
      // Luego, crea la inscripción a la asignatura
      const Registrationf = await Registration.create({
        alumno_id: alumnoid,
        PuestoAcademicoid: asignatura_id, // Asegúrate de que 'asignatura' sea un ID válido
      });

      return { alumno: Registrationf };
    } catch (error) {
      console.error("Error creating alumno and asignatura inscripcion:", error);
      throw new Error("Database error");
    }
  };
  // Actualiza un alumno por ID
  async Update(id: string, alumnoData: Partial<Student>): Promise<boolean> {
    try {
      const [updatedRows] = await Student.update(alumnoData, {
        where: { Id:id },
      });
      return updatedRows > 0 ? true : false;
    } catch (error) {
      console.error("Error updating alumno:", error);
      throw new Error("Database error");
    }
  }

  async ChangeStatus(id: string, status: string): Promise<boolean> {
    try {
      const [updatedRows] = await Student.update(
        { Status: status },
        {
          where: { Id:id },
        }
      );
      return updatedRows > 0 ? true : false;
    } catch (error) {
      console.error("Error changing alumno status:", error);
      throw new Error("Database error");
    }
  }
  /*  No se deberia eliminar un alumno, sino desactivarlo o marcarlo como eliminado

    d
    
    
    
    
    
    
    
    
    
    
    
    elete: async (id: string) => {
        try {
            const deletedRows = await Student.destroy({
                where: { id }
            });
            return deletedRows > 0;
        } catch (error) {
            console.error('Error deleting alumno:', error);
            throw new Error('Database error');
        }
    },
   */
}
