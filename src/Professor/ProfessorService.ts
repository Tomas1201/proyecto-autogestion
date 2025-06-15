import {ProfessorRepository} from './ProfessorRepository.js';   
import { Professor } from './ProfessorModel.js';
import { AssignmentService } from '../Services/AssignmentService.js';

const professorRepository = ProfessorRepository.getInstance();

export const ProfessorService = {
  getById: async (id: number) => {
    return professorRepository.findById(id);
  },

  getAll: async () => {
    return professorRepository.findAll();
  },

  getByName: async (name: string) => {
    return professorRepository.findByName(name);
  },

  getByApellido: async (apellido: string) => {
    return professorRepository.findByApellido(apellido);
  },
 
  getByDni: async (dni: string) => {
    return professorRepository.findByDni(dni);
  },

  getByLegajo: async (legajo: number) => {
    return professorRepository.findByLegajo(legajo);
  },

  getByEmail: async (email: string) => {
    return professorRepository.findByEmail(email);
  },

  create: async (professorData: Professor) => {
    return professorRepository.create(professorData);
  },

  update: async (id: number, professorData: Professor) => {
    return professorRepository.update(id, professorData);
  },

  archive: async (id: number) => {
    return professorRepository.archive(id);
  },

  hasActiveAssignments: async (id: number): Promise<boolean> => {
    const assignments = await AssignmentService.getByProfessor(id);
    return assignments.length > 0;
  }
}

  /*
  delete: async (id: string) => {
    try {
      const deleted = await ProfessorRepository.delete(id);
      if (!deleted) {
        throw new Error('Professor not found or not deleted');
      }
      return deleted;
    } catch (error) {
      console.error('Error deleting professor:', error);
      throw new Error('Database error');
    }
  }
  */  
 
