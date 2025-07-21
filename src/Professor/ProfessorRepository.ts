import { professorModel, Professor } from './ProfessorModel.js';
import { Op } from 'sequelize';
import { ProfessorAsignatura, ProfessorAsignaturaModel } from '../Database/ProfessorAsignaturaModel.js';

//REVISAR BIEN LOS DE LAS ASIGNATURAS

export class ProfessorRepository {
  async create(data: any) {
    return await professorModel.create(data);
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
    try {
      const professors = await professorModel .findAll({
        where: { state },
      });
      return professors ? professors as Professor[] : [];
      
    } catch (error) {
      console.error('Error fetching professors by state:', error);
      throw new Error('Error fetching professors by state');
    }
  }

  async archiveProfessorById(professorId: number) {
    const profesor = await professorModel .findByPk(professorId);
    if (!profesor) throw new Error('Profesor no encontrado');
    if (profesor.get('state') !== true) throw new Error('El profesor ya está archivado');
  
    await profesor.update({ state: false });
    return profesor;
  }

  async unarchiveProfessorById(professorId: number) {
    const profesor = await professorModel .findByPk(professorId);
    if (!profesor) throw new Error('Profesor no encontrado');
    if (profesor.get('state') !== false) throw new Error('El profesor ya está activo');

    await profesor.update({ state: true });
    return profesor;
  }

  async searchByName(name: string) {
    try {
      const professors = await professorModel.findAll({
        where: {
          nombre: {
            [Op.like]: `%${name}%`,
          },
        },
      });
      return professors ? professors as Professor[] : [];
    } catch (error) {
      console.error('Error fetching professors by name:', error);
      throw new Error('Error fetching professors by name');
    }
  }
  async searchByLastName(lastname: string) {
    try {
      const professors = await professorModel.findAll({
        where: {
          apellido: {
            [Op.like]: `%${lastname}%`,
          },
        },
      });
      return professors ? professors as Professor[] : [];
    } catch (error) {
      console.error('Error fetching professors by lastname:', error);
      throw new Error('Error fetching professors by lastname');
    }
  }
  async searchByDni(dni: string) {
    try {
    const professor = await professorModel.findAll({
      where: { dni },
    });
    return professor ? professor as Professor[] : [];
  }catch (error) {
    console.error('Error fetching professor by DNI:', error);
    throw new Error('Error fetching professor by DNI');
  }
}
  async searchByLegajo(legajo: string) {
    try {
      const professor = await professorModel.findAll({
        where: { legajo },
      });
      return professor ? professor as Professor[] : [];
    } catch (error) {
      console.error('Error fetching professor by Legajo:', error);
      throw new Error('Error fetching professor by Legajo');
    }
    
  }

}
const professorRepository = new ProfessorRepository();
export default professorRepository;


