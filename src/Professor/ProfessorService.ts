import professorRepository from './ProfessorRepository.js';


export class ProfessorService {


  async registerProfessor(data: any) {
    // Validaciones simples
    console.log('Datos recibidos para registrar profesor:', data);
    if (!data.nombre_completo || !data.dni || !data.legajo || !data.titulo_academico || !data.correo || !data.telefono || !data.disponibilidad_horaria || !data.id) {
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
  
  
  async deleteProfessor(id: number) {
    // cuando tengamos Asignación, simplemente actualizaremos:
    // const tieneAsignaciones = await this.asignacionRepo.profesorTieneAsignaciones(id);
    // Simulación: en el futuro esto consultará una tabla de asignaciones reales
    const tieneAsignaciones = false;
  
    if (tieneAsignaciones) {
      throw new Error('El profesor está asignado a una asignatura y no puede eliminarse');
    }
  
    await professorRepository.deleteById(id);
  }
  
}
