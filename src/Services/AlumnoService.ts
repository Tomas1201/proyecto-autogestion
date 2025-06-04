import {AlumnoRepository} from '../Repositories/AlumnoRepository.ts';   
export const AlumnoService = {
  getById: async (id) => {
    try {
     // const alumno = await AlumnoRepository.findByPk(id);
      //return alumno;
    } catch (error) {
      console.error('Error fetching alumno by ID:', error);
      throw new Error('Database error');
    }

    }
}