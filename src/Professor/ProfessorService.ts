import professorRepository from './ProfessorRepository.js';
import { ProfessorAsignaturaModel } from '../Database/ProfessorAsignaturaModel.js';
import { professorModel } from './ProfessorModel.js';

export class ProfessorService {


  async registerProfessor(data: any) {
    // Validaciones simples
    console.log('Datos recibidos para registrar profesor:', data);
    if (!data.id || !data.nombre || !data.dni || !data.legajo || !data.titulo_academico || !data.correo || !data.telefono || !data.disponibilidad_horaria ) {
      throw new Error('Todos los campos son obligatorios');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo)) {
      throw new Error('Correo electrónico inválido');
    }

    const existing = await professorRepository.findByDniOrLegajo(data.dni, data.legajo);
    if (existing) {
      throw new Error('Ya existe un profesor con ese DNI o Legajo');
    }

    return await professorRepository.create(data);
  }
  async registerAsignatura(data: any) {
    console.log('Datos recibidos para registrar asignaturas:', data);
    if (!data.Id || !data.nombre || !data.dia || !data.hora_inicio || !data.hora_fin) {
      throw new Error('Los campos professorId y asignaturaId son obligatorios');
   }
   const existing = await professorRepository.findByDniOrLegajo(data.nombre, data.dia);
    if (existing) {
      throw new Error('Ya existe un profesor con ese DNI o Legajo');
    }
    return await professorRepository.create(data);

  }
  

  //Busco Todos los profesores
  async searchProfessors(query: any) {
    return await professorRepository.findAll();
  }
  //Busco por estado
  async searchByState(state: boolean) {
    return await professorRepository.searchByState(state);
  }
  // Busco por nombre
  async searchByName(name: string) {
    return await professorRepository.searchByName(name);
  }
  async searchByLastName(lastname: string) {
    return await professorRepository.searchByLastName(lastname);
  }
  // Busco por DNI
  async searchByDni(dni: string) {
    return await professorRepository.searchByDni(dni);
  }
  // Busco por Legajo
  async searchByLegajo(legajo: string) {
    return await professorRepository.searchByLegajo(legajo);
  }
  // Actualizo un profesor
  async updateProfessor(id: number, data: Partial<any>) {
    if (data.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo)) {
      throw new Error('Correo electrónico inválido');
    }
  
    return await professorRepository.updateById(id, data);
  }
  
  async deleteProfessor(id: number): Promise<number> {
    const asignaciones = await ProfessorAsignaturaModel.findAll({
      where: { professorId: id },
    });
  
    if (asignaciones.length > 0) {
      class CustomError extends Error {
        Code: number;
        constructor(message: string, code: number) {
          super(message);
          this.Code = code;
        }
      }
  
      throw new CustomError(
        'El profesor está asignado a una o más asignaturas y no puede ser eliminado.',
        400
      );
    }
  
    return await professorModel.destroy({ where: { id } });
  }
  
  async archiveProfessor(id: number) {
    const profesor = await professorRepository.archiveProfessorById(id);
    return profesor;
  }
  
  async unarchiveProfessor(id: number) {
    const profesor = await professorRepository.unarchiveProfessorById(id);
    return profesor;
  }
}
