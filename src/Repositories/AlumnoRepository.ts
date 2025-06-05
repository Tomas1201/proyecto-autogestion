import { Op } from "../Database/Sequelize.js";
import { AlumnoModel } from "../Models/AlumnoModel.js";
import { Alumno } from "../Models/AlumnoModel"; // Assuming Alumno is a type or interface representing the model
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
        console.log('=== DEBUG INFO ===');
        console.log('Input name:', name);
        console.log('Input type:', typeof name);
        console.log('Model name:', AlumnoModel.name);
        console.log('Table name:', AlumnoModel.tableName);
        
        const query = {
            where: {
                nombre: {
                    [Op.like]: `%${name.toLowerCase()}%`
                }
            }
        };
        
        console.log('Query object:', JSON.stringify(query, null, 2));
        
        const alumnos = await AlumnoModel.findAll(query);
        
        console.log('Results:', alumnos.length);
        console.log('==================');
        
        return alumnos;
    } catch (error) {
        console.error('Error fetching alumno by name:', error);
        throw error;
    }
}
    ,
    create: async (alumnoData: Alumno) => {
        try {
            const newAlumno = await AlumnoModel.create(alumnoData as any);
            return newAlumno;
        } catch (error) {
            console.error('Error creating alumno:', error);
            throw new Error('Database error');
        }
    },
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