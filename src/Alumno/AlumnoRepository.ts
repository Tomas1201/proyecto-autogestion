import { Op } from "sequelize";
import { AlumnoModel } from "./AlumnoModel.js";
import { Alumno } from "./AlumnoModel.js";


export const AlumnoRepository = {  
    
    
    findByPk: async (id: string) => {
        try {
            const alumno = await AlumnoModel.findByPk(id);
            return alumno;
        } catch (error) {
            console.error('Error fetching alumno by ID:', error);
            throw new Error('Database error');
        }
    },
  

    findAll: async () => {
        try {
            const alumnos = await AlumnoModel.findAll();
            return alumnos;
        } catch (error) {
            console.error('Error fetching all alumnos:', error);
            throw new Error('Database error');
        }      
    },


   findByName: async (name: string) => {
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
                
        return alumnos;
    } catch (error) {
        console.error('Error fetching alumno by name:', error);
        throw error;
        }
    },

    // Devuelve un alumno por apellido
    findByApellido: async (apellido: string) => {
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
                
        return alumnos;
    } catch (error) {
        console.error('Error fetching alumno by apellido:', error);
        }
    },
    
    
    // Crea un nuevo alumno
    create: async (alumnoData: Alumno) => {
        try {
            const newAlumno = await AlumnoModel.create(alumnoData as any);
            return newAlumno;
        } catch (error) {
            console.error('Error creating alumno:', error);
            throw new Error('Database error');
        }
    },


    // Actualiza un alumno por ID
    update: async (id: string, alumnoData: Alumno) => {
        try {
            const [updatedRows] = await AlumnoModel.update(alumnoData, {
                where: { id }
            });
            return updatedRows > 0;
        } catch (error) {
            console.error('Error updating alumno:', error);
            throw new Error('Database error');
        }
    },


    // Elimina un alumno por ID   
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


}