import { Op } from "sequelize";
import { Alumno } from "../Models/AlumnoModel.js";
import { AlumnoInterface } from "../Alumno/AlumnoInterface.js";
import { Inscriptos } from "../Models/inscriptosModel.js";
import { SequelizeDB } from "../Database/Sequelize.js"; // Importar el modelo de inscriptos si es necesario
import { AlumnoDTO } from "../Middlewares/validationMiddleware.js";

export class AlumnoRepository implements AlumnoInterface {
  static instance: AlumnoRepository;
  static getInstance(): AlumnoRepository {
    if (!AlumnoRepository.instance) {
      AlumnoRepository.instance = new AlumnoRepository();
    }
    return AlumnoRepository.instance;
  }
  constructor() {
  }

  async findById(id: number): Promise<Alumno | null> {
    try {
      const alumno = await Alumno.findByPk(id);
      return alumno ? (alumno as Alumno) : null;
    } catch (error) {
      console.error("Error fetching alumno by ID:", error);
      throw new Error("Database error");
    }
  }

  async findAll(): Promise<Alumno[]> {
    try {
      const alumnos = await Alumno.findAll();
      return alumnos ? (alumnos as Alumno[]) : [];
      // condicion ? true : false
    } catch (error) {
      console.error("Error fetching all alumnos:", error);
      throw new Error("Database error");
    }
  }

  async findByName(name: string): Promise<Alumno[] | null> {
    try {
      if (!name || typeof name !== "string") {
        throw new Error("Invalid name parameter");
      }
      const query = {
        where: {
          nombre: {
            [Op.like]: `%${name.toLowerCase()}%`,
          },
        },
      };

      const alumnos = await Alumno.findAll(query);

      return alumnos ? (alumnos as Alumno[]) : null;
    } catch (error) {
      console.error("Error fetching alumno by name:", error);
      throw error;
    }
  }

  // Devuelve un alumno por apellido

  async findByApellido(apellido: string): Promise<Alumno[] | null> {
    try {
      if (!apellido || typeof apellido !== "string") {
        throw new Error("Invalid apellido parameter");
      }
      const query = {
        where: {
          apellido: {
            [Op.like]: `%${apellido.toLowerCase()}%`,
          },
        },
      };

      const alumnos = await Alumno.findAll(query);

      return alumnos ? (alumnos as Alumno[]) : null;
    } catch (error) {
      console.error("Error fetching alumno by apellido:", error);
      return null;
    }
  }

  async findByAsignatura(asignatura: string): Promise<Alumno[] | null> {
    try {
      const alumnos = await Alumno.findAll({
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
                  nombre: {
                    [Op.iLike]: `%${asignatura}%`,
                  },
                },
                required: true,
              },
            ],
          },
        ],
      });

      return alumnos ? (alumnos as Alumno[]) : null;
    } catch (error) {
      console.error("Error fetching alumnos by asignatura:", error);
      throw error;
    }
  }

  async findByLegajo(legajo: number): Promise<Alumno | null> {
    try {
      const alumnos = await Alumno.findAll({
        where: { legajo: legajo },
      });

      return alumnos.length > 0 ? (alumnos[0] as Alumno) : null;
    } catch (error) {
      console.error("Error fetching alumnos by asignatura:", error);
      throw error;
    }
  }

  async findByDni(DNI: number): Promise<Alumno | null> {
    try {
      const alumnos = await Alumno.findAll({
        where: { dni: DNI },
      });
      return alumnos.length > 0 ? (alumnos[0] as Alumno) : null;
    } catch (error) {
      console.error("Error fetching alumnos by asignatura:", error);
      throw error;
    }
  }

  async findByEmail(Email: string): Promise<Alumno | null> {
    try {
      const alumnos = await Alumno.findAll({
        where: { email: Email },
      });
      return alumnos.length > 0 ? (alumnos[0] as Alumno) : null;
    } catch (error) {
      console.error("Error fetching alumnos by asignatura:", error);
      throw error;
    }
  }

  async findByStatus(status: string): Promise<Alumno[] | null> {
    try {
      const query = {
        where: {
          status: {
            [Op.eq]: status,
          },
        },
      };

      const alumnos = await Alumno.findAll(query);

      return alumnos ? (alumnos as Alumno[]) : null;
    } catch (error) {
      console.error("Error fetching alumnos by status:", error);
      throw error;
    }
  }

  async findByCarrera(carrera: string): Promise<Alumno[] | null> {
    try {
      const alumnos = await Alumno.findAll({
       where: {
          carrera: {
            [Op.like]: `%${carrera.toLowerCase()}%`,
          },
        },
      });

      return alumnos ? (alumnos as Alumno[]) : null;
    } catch (error) {
      console.error("Error fetching alumnos by asignatura:", error);
      throw error;
    }
  }

  // Crea un nuevo alumno
  async create(alumnoData: Alumno): Promise<Alumno | null> {
    try {
      const existingAlumno = await Alumno.findOne({
        where: {
          [Op.or]: [
            { email: alumnoData.email },
            { dni: alumnoData.dni },
            { legajo: alumnoData.legajo },    
          ],
        },
      });
      if (existingAlumno) {
        console.error("Alumno with the same email, dni or legajo already exists");
        return null; // O lanzar un error según tu lógica
        
      }
      const newAlumno = await Alumno.create(alumnoData as any);
      return newAlumno as Alumno;
    } catch (error) {
      console.error("Error creating alumno:", error);
      return null; // O puedes lanzar un error según tu lógica
      throw new Error("Database error");
    }
  }

  createAsignaturaInscripcion = async (
    alumnoid: number,
    asignatura_id: number
  ): Promise<any> => {
    try {
      // Luego, crea la inscripción a la asignatura
      const inscripcion = await Inscriptos.create({
        alumno_id: alumnoid,
        carrera_id: asignatura_id, // Asegúrate de que 'asignatura' sea un ID válido
      });

      return { alumno: inscripcion };
    } catch (error) {
      console.error("Error creating alumno and asignatura inscripcion:", error);
      throw new Error("Database error");
    }
  };
  // Actualiza un alumno por ID
  async update(id: number, alumnoData: Partial<Alumno>): Promise<boolean> {
    try {
      const [updatedRows] = await Alumno.update(alumnoData, {
        where: { id },
      });
      return updatedRows > 0 ? true : false;
    } catch (error) {
      console.error("Error updating alumno:", error);
      throw new Error("Database error");
    }
  }

  /*  No se deberia eliminar un alumno, sino desactivarlo o marcarlo como eliminado

    delete: async (id: string) => {
        try {
            const deletedRows = await Alumno.destroy({
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
