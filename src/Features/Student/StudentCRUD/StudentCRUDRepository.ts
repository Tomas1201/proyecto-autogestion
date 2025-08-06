import { Op } from "sequelize";
import { Student } from "../../../Shared/Models/StudentModel.js";
import { StudentInterface } from "../Repositories/StudentInterface.js";
import { Registration } from "../../../Models/DependentEntities/RegistrationModel.js";
import { SequelizeDB } from "../../../Database/Sequelize.js"; // Importar el modelo de inscriptos si es necesario
import { PuestoAcademicoModel } from "../../../Models/DependentEntities/AcademicPositionModel.js";

export class StudentRepository implements StudentInterface {
  static instance: StudentRepository;
  static getInstance(): StudentRepository {
    if (!StudentRepository.instance) {
      StudentRepository.instance = new StudentRepository();
    }
    return StudentRepository.instance;
  }
  constructor() {}
  
  async FindByName(Name: string): Promise<Student[] | null> {
    try {
      if (!Name || typeof Name !== "string") {
        throw new Error("Invalid Name parameter");
      }
      const alumnos = await Student.findAll({
        where: {
          nombre: {
            [Op.like]: `%${Name.toLowerCase()}%`,
          },
        },
      });
      return alumnos ? (alumnos as Student[]) : null;
    } catch (error) {
      console.error("Error fetching alumnos by name:", error);
      throw error;
    }
  }

  async FindById(id: number): Promise<Student | null> {
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

  async FindByLastName(LastName: string): Promise<Student[] | null> {
    try {
      if (!LastName || typeof LastName !== "string") {
        throw new Error("Invalid apellido parameter");
      }
      const query = {
        where: {
          LastName: {
            [Op.like]: `%${LastName.toLowerCase()}%`,
          },
        },
      };

      const Students = await Student.findAll(query);

      return Students ? (Students as Student[]) : null;
    } catch (error) {
      console.error("Error fetching alumno by apellido:", error);
      return null;
    }
  }

  async FindBySubject(Subject: string): Promise<Student[] | null> {
    try {
      const Students = await Student.findAll({
        include: [
          {
            model: SequelizeDB.models.inscriptos,
            as: "inscripcionesCarrera",
            attributes: [],
            required: true,
            include: [
              {
                model: SequelizeDB.models.asignatura, // Ajusta según tu estructura real
                as: "asignatura",
                attributes: [],
                where: {
                  Name: {
                    [Op.iLike]: `%${Subject}%`,
                  },
                },
                required: true,
              },
            ],
          },
        ],
      });

      return Students ? (Students as Student[]) : null;
    } catch (error) {
      console.error("Error fetching student by subject:", error);
      throw error;
    }
  }

  async FindByFile(File: number): Promise<Student | null> {
    try {
      const Studentf = await Student.findAll({
        where: { File: File },
      });

      return Studentf.length > 0 ? (Studentf[0] as Student) : null;
    } catch (error) {
      console.error("Error fetching student by subject:", error);
      throw error;
    }
  }

  async FindByDni(DNI: number): Promise<Student | null> {
    try {
      const alumnos = await Student.findAll({
        where: { dni: DNI },
      });
      return alumnos.length > 0 ? (alumnos[0] as Student) : null;
    } catch (error) {
      console.error("Error fetching alumnos by asignatura:", error);
      throw error;
    }
  }

  async FindByEmail(Email: string): Promise<Student | null> {
    try {
      const alumnos = await Student.findAll({
        where: { email: Email },
      });
      return alumnos.length > 0 ? (alumnos[0] as Student) : null;
    } catch (error) {
      console.error("Error fetching alumnos by asignatura:", error);
      throw error;
    }
  }

  async FindByStatus(status: string): Promise<Student[] | null> {
    try {
      const query = {
        where: {
          status: {
            [Op.eq]: status,
          },
        },
      };

      const alumnos = await Student.findAll(query);

      return alumnos ? (alumnos as Student[]) : null;
    } catch (error) {
      console.error("Error fetching alumnos by status:", error);
      throw error;
    }
  }

  async FindByCareer(carrera: string): Promise<Student[] | null> {
    try {
      const alumnos = await Student.findAll({
        where: {
          carrera: {
            [Op.like]: `%${carrera.toLowerCase()}%`,
          },
        },
      });

      return alumnos ? (alumnos as Student[]) : null;
    } catch (error) {
      console.error("Error fetching alumnos by asignatura:", error);
      throw error;
    }
  }

  // Crea un nuevo alumno
  async Create(alumnoData: Student): Promise<Student | null> {
    try {
      const existingAlumno = await Student.findOne({
        where: {
          [Op.or]: [
            { email: alumnoData.Email },
            { dni: alumnoData.dni },
            { legajo: alumnoData.legajo },
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
  async Update(id: number, alumnoData: Partial<Student>): Promise<boolean> {
    try {
      const [updatedRows] = await Student.update(alumnoData, {
        where: { id },
      });
      return updatedRows > 0 ? true : false;
    } catch (error) {
      console.error("Error updating alumno:", error);
      throw new Error("Database error");
    }
  }

  async ChangeStatus(id: number, status: string): Promise<boolean> {
    try {
      const [updatedRows] = await Student.update(
        { status: status },
        {
          where: { id },
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
