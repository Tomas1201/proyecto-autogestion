import { AlumnoModel } from "../Models/AlumnoModel";

export const AlumnoRepository = {  
    
    
    findByPk: async (id) => {
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
    create: async (alumnoData) => {
        try {
            const newAlumno = await AlumnoModel.create(alumnoData);
            return newAlumno;
        } catch (error) {
            console.error('Error creating alumno:', error);
            throw new Error('Database error');
        }
    },
    update: async (id, alumnoData) => {
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
    delete: async (id) => {
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