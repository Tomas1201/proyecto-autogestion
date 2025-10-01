import {Op} from 'sequelize';
import { Student } from '../../../shared/models/student.model.js';
import { SequelizeDB } from '../../../database/sequelize.js';


export class StudentSearchRepository {
   static instance: StudentSearchRepository;
  static getInstance(): StudentSearchRepository {
    if (!StudentSearchRepository.instance) {
      StudentSearchRepository.instance = new StudentSearchRepository();
    }
    return StudentSearchRepository.instance;
  }

async FindByName(Name: string): Promise<Student[] | null> {
    try {
      if (!Name) {
        throw new Error("Invalid Name parameter");
      }
      const alumnos = await Student.findAll({
        where: {
          Name: {
            [Op.iLike]: `%${Name.toLowerCase()}%`,
          },
        },
      });
      return alumnos ? (alumnos as Student[]) : null;
    } catch (error) {
      console.error("Error fetching alumnos by name:", error);
      throw error;
    }
  }

   async FindByLastName(LastName: string): Promise<Student[] | null> {
    try {
      if (!LastName || typeof LastName !== "string") {
        throw new Error("Invalid apellido parameter");
      }
      const query = {
        where: {
          LastName: {
            [Op.iLike]: `%${LastName.toLowerCase()}%`,
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
            model: SequelizeDB.models.Registration,
            as: "Registrations",
            attributes: [],
            required: true,
            include: [
              {
                model: SequelizeDB.models.Subject, // Ajusta según tu estructura real
                as: "Subject",
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
        where: { Dni: {
          [Op.eq]: DNI}
                },
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
        where: { Email: Email },
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
          Status: {
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
          Career: {
            [Op.iLike]: `%${carrera.toLowerCase()}%`,
          },
        },
      });

      return alumnos ? (alumnos as Student[]) : null;
    } catch (error) {
      console.error("Error fetching alumnos by asignatura:", error);
      throw error;
    }
  }

}