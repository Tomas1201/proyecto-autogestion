import { Op } from "sequelize";
import { ProfessorModel } from "./ProfessorModel.js";
import { Professor } from "./ProfessorModel.js";
import { ProfessorInterface } from "./ProfessorInterface.js";

export class ProfessorRepository implements ProfessorInterface {  
    static instance: ProfessorRepository;
    static getInstance(): ProfessorRepository {
        if (!ProfessorRepository.instance) {
            ProfessorRepository.instance = new ProfessorRepository();
        }
        return ProfessorRepository.instance;
    }
    
    async findById(id: number): Promise<Professor | null> {
        try {
            const professor = await ProfessorModel.findByPk(id);
            return professor ? (professor.toJSON() as Professor) : null;
        } catch (error) {
            console.error('Error fetching professor by ID:', error);
            throw new Error('Database error');
        }
    }
  
    async findAll(): Promise<Professor[]> {
        try {
            const professors = await ProfessorModel.findAll();
            return professors.map(professor => professor.toJSON() as Professor);
        } catch (error) {
            console.error('Error fetching all professors:', error);
            throw new Error('Database error');
        }      
    }

    async findByName(name: string): Promise<Professor[] | null> {
        try {
            if (!name) throw new Error('Invalid name parameter');
            const professors = await ProfessorModel.findAll({
                where: { nombre: { [Op.like]: `%${name}%` } }
            });
            return professors.map(professor => professor.toJSON() as Professor);
        } catch (error) {
            console.error('Error fetching professor by name:', error);
            throw error;
        }
    }

    async findByApellido(apellido: string): Promise<Professor[] | null> {
        try {
            if (!apellido) throw new Error('Invalid apellido parameter');
            const professors = await ProfessorModel.findAll({
                where: { apellido: { [Op.like]: `%${apellido}%` } }
            });
            return professors.map(professor => professor.toJSON() as Professor);
        } catch (error) {
            console.error('Error fetching professor by apellido:', error);
            throw error;
        }
    }
    
    async findByEmail(email: string): Promise<Professor | null> {
        try {
            const professor = await ProfessorModel.findOne({ where: { email } });
            return professor ? (professor.toJSON() as Professor) : null;
        } catch (error) {
            console.error('Error fetching professor by email:', error);
            throw new Error('Database error');
        }
    }

    async findByLegajo(legajo: number): Promise<Professor | null> {
        try {
            const professor = await ProfessorModel.findOne({ where: { legajo } });
            return professor ? (professor.toJSON() as Professor) : null;
        } catch (error) {
            console.error('Error fetching professor by legajo:', error);
            throw new Error('Database error');
        }
    }

    async findByDni(dni: string): Promise<Professor | null> {
        try {
            const professor = await ProfessorModel.findOne({ where: { dni } });
            return professor ? (professor.toJSON() as Professor) : null;
        } catch (error) {
            console.error('Error fetching professor by DNI:', error);
            throw new Error('Database error');
        }
    }
    
    async create(professorData: Omit<Professor, 'id'>): Promise<Professor> {
        try {
            const createdProfessor = await ProfessorModel.create(professorData as any);
            return createdProfessor.toJSON() as Professor;
        } catch (error) {
            console.error('Error creating professor:', error);
            throw new Error('Database error');
        }
    }

    async update(id: number, professorData: Partial<Professor>): Promise<boolean> {
        try {
            const [updatedRows] = await ProfessorModel.update(professorData, {
                where: { id }
            });
            return updatedRows > 0;
        } catch (error) {
            console.error('Error updating professor:', error);
            throw new Error('Database error');
        }
    }

    async archive(id: number): Promise<boolean> {
        try {
            const [updatedRows] = await ProfessorModel.update(
                { estado: 'inactivo' }, 
                { where: { id } }
            );
            return updatedRows > 0;
        } catch (error) {
            console.error('Error archiving professor:', error);
            throw new Error('Database error');
        }
    }
}

    

    


   /*  No se deberia eliminar un professor, sino desactivarlo o marcarlo como eliminado

    delete: async (id: string) => {
        try {
            const deletedRows = await ProfessorModel.destroy({
                where: { id }
            });
            return deletedRows > 0;
        } catch (error) {
            console.error('Error deleting professor:', error);
            throw new Error('Database error');
        }
    },
   */



