import { Op } from "sequelize";
import { AlumnoModel } from "./AlumnoModel.js";
import { Alumno } from "./AlumnoModel.js";
import { AlumnoInterface } from "./AlumnoInterface.js";
import {InscriptosModel} from '../Database/inscriptosModel.js';
import { SequelizeDB } from "../Database/Sequelize.js"; // Importar el modelo de inscriptos si es necesario

export class AlumnoRepository implements AlumnoInterface {  
    static instance: AlumnoRepository;
    static getInstance(): AlumnoRepository {
        if (!AlumnoRepository.instance) {
            AlumnoRepository.instance = new AlumnoRepository();
        }
        return AlumnoRepository.instance;
    }
    constructor() {
        // Constructor logic if needed
    }
    
    async findById(id: number): Promise<Alumno | null> {
        try {
            const alumno = await AlumnoModel.findByPk(id);
            return alumno ? alumno as Alumno : null;
        } catch (error) {
            console.error('Error fetching alumno by ID:', error);
            throw new Error('Database error');
        }
    }
  

    async findAll(): Promise<Alumno[]> {
        try {
            const alumnos = await AlumnoModel.findAll();
            return alumnos ? alumnos as Alumno[] : [];
        } catch (error) {
            console.error('Error fetching all alumnos:', error);
            throw new Error('Database error');
        }      
    }


    async findByName(name: string): Promise<Alumno[] | null> {
        try {
            if (!name || typeof name !== 'string') {
                throw new Error('Invalid name parameter');
            }
            const query = {
                where: {
                    nombre: {
                        [Op.like]: `%${name.toLowerCase()}%`
                    }
                }
            };
            
            const alumnos = await AlumnoModel.findAll(query);
                    
            return alumnos ? alumnos as Alumno[] : null;
        } catch (error) {
            console.error('Error fetching alumno by name:', error);
            throw error;
        }
    }

    // Devuelve un alumno por apellido

    async findByApellido(apellido: string): Promise<Alumno[] | null> {
        try {
            if (!apellido || typeof apellido !== 'string') {
                throw new Error('Invalid apellido parameter');
            }
            const query = {
                where: {
                    apellido: {
                        [Op.like]: `%${apellido.toLowerCase()}%`
                    }
                }
            };
            
            const alumnos = await AlumnoModel.findAll(query);
                    
            return alumnos ? alumnos as Alumno[] : null;
        } catch (error) {
            console.error('Error fetching alumno by apellido:', error);
            return null;
        }
    }
    


    async findByAsignatura(asignatura: string): Promise<Alumno[] | null> {
        try {
const alumnos = await AlumnoModel.findAll({
    include: [
        {
            model: SequelizeDB.models.inscriptos,
            as: 'inscripcionesCarrera',
            attributes: [],
            required: true,
            include: [
                {
                    model: SequelizeDB.models.asignatura, // Ajusta según tu estructura real
                    as: 'asignatura',
                    attributes: [],
                    where: {
                        nombre: {
                            [Op.iLike]: `%${asignatura}%`
                        }
                    },
                    required: true,
                },
            ],
        },
    ],
});

                    
            return alumnos ? alumnos as Alumno[] : null;
        } catch (error) {
            console.error('Error fetching alumnos by asignatura:', error);
            throw error;
        }
    }

    async findByLegajo(legajo: number): Promise<Alumno | null> {
        try{
            const alumnos = await AlumnoModel.findAll({
                    where: { legajo: legajo }
            });

            return alumnos.length > 0 ? alumnos[0] as Alumno : null;
        }catch(error){
             console.error('Error fetching alumnos by asignatura:', error);
            throw error;
        }

    }

    async findByDni(DNI: number): Promise<Alumno | null>{
        try{
            const alumnos = await AlumnoModel.findAll({
                where: { dni: DNI }
            }
            );
            return alumnos.length > 0 ? alumnos[0] as Alumno : null;
        }catch(error){
            console.error('Error fetching alumnos by asignatura:', error);
            throw error;
        }   
    }

    async findByEmail(Email: string): Promise<Alumno | null>{
        try{
            const alumnos = await AlumnoModel.findAll({
                where: {email: Email}
            })
            return alumnos.length > 0 ? alumnos[0] as Alumno : null;
        }catch(error){
            console.error('Error fetching alumnos by asignatura:', error);
            throw error;
        }
    }

    

    async findByCarrera(carrera: string): Promise<Alumno[] | null> {
        try {
const alumnos = await AlumnoModel.findAll({
    include: [
        {
            model: SequelizeDB.models.inscriptos,
            as: 'inscripcionesCarrera',
            attributes: [],
            required: true,
            include: [
                {
                    model: SequelizeDB.models.carrera, // Ajusta según tu estructura real
                    as: 'carrera',
                    attributes: [],
                    where: {
                        nombre: {
                            [Op.iLike]: `%${carrera}%`
                        }
                    },
                    required: true,
                },
            ],
        },
    ],
});

                    
            return alumnos ? alumnos as Alumno[] : null;
        } catch (error) {
            console.error('Error fetching alumnos by asignatura:', error);
            throw error;
        }
    }
    
    // Crea un nuevo alumno
    async create(alumnoData: Omit<Alumno, 'id'>) : Promise<Alumno> {
        try {
            const newAlumno = await AlumnoModel.create(alumnoData as any);
            return newAlumno as Alumno;
        } catch (error) {
            console.error('Error creating alumno:', error);
            throw new Error('Database error');
        }
    }


    // Actualiza un alumno por ID
    async update(id: number, alumnoData: Partial<Alumno>) : Promise<boolean> {
        try {
            const [updatedRows] = await AlumnoModel.update(alumnoData, {
                where: { id }
            });
            return updatedRows > 0 ? true : false;
        } catch (error) {
            console.error('Error updating alumno:', error);
            throw new Error('Database error');
        }
    }


   /*  No se deberia eliminar un alumno, sino desactivarlo o marcarlo como eliminado

    delete: async (id: string) => {
        try {
            const deletedRows = await AlumnoModel.destroy({
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

