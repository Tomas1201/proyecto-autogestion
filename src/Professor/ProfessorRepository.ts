import { professorModel, Professor } from './ProfessorModel.js';
import { Op } from 'sequelize';
import { ProfessorAsignatura, ProfessorAsignaturaModel } from '../Database/ProfessorAsignaturaModel.js';



export class ProfessorRepository {
  async create(data: any) {
    return await professorModel .create(data);
  }

  async findByDniOrLegajo(dni: string, legajo: string) {
    return await professorModel .findOne({ where: { dni, legajo } });
  }

  async updateById(id: number, data: Partial<any>) {
    const profesor = await professorModel .findByPk(id);
    if (!profesor) throw new Error('Profesor no encontrado');
  
    await profesor.update(data);
    return profesor;
  }

  async findAll(): Promise<Professor[]> {
    try {
      const professors = await professorModel.findAll();
      return professors ? professors as Professor[] : [];
    } catch (error) {
      console.error('Error fetching professors:', error);
      throw new Error('Error fetching professors');
    }
    
  }
  
  async deleteById(id: number) {
    const profesor = await professorModel.findByPk(id);
    if (!profesor) throw new Error('Profesor no encontrado');
  
    await professorModel.destroy();
    return;
  }

  async checkProfessorAssignments(professorId: number) {
    return await ProfessorAsignaturaModel.findAll({
      where: { professorId },
    });
  }
  //busco todos los profesores por estado
  async searchByState(state: boolean) {
    return await professorModel .findAll({
      where: { state },
    });
  }
  async archiveProfessorById(professorId: number) {
    await professorModel.destroy({
      where: { id: professorId },
    });
  }

  async searchByName(name: string) {
    return await professorModel.findAll({
      where: {
        nombre_completo: {
          [Op.like]: `%${name}%`,
        },
      },
    });
  }
  async searchByDni(dni: string) {
    return await professorModel.findAll({
      where: { dni },
    });
  }
  async searchByLegajo(legajo: string) {
    return await professorModel.findAll({
      where: { legajo },
    });
  }
};

const professorRepository = new ProfessorRepository();
export default professorRepository;


