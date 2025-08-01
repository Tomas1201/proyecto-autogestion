import professorRepository from "../Repositories/ProfessorRepository.js";
import { ProfessorAsignaturaModel } from "../Models/ProfessorAsignaturaModel.js";
import { professorModel } from "../Models/ProfessorModel.js";
import { AsignaturaModel } from "../Models/AsignaturaModel.js";

export class ProfessorService {
  async registerProfessor(data: any) {
    // Validaciones simples
    console.log("Datos recibidos para registrar profesor:", data);
    if (
      !data.id ||
      !data.nombre ||
      !data.dni ||
      !data.legajo ||
      !data.titulo_academico ||
      !data.correo ||
      !data.telefono ||
      !data.disponibilidad_horaria
    ) {
      throw new Error("Todos los campos son obligatorios");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo)) {
      throw new Error("Correo electrónico inválido");
    }

    const existing = await professorRepository.findByDniOrLegajo(
      data.dni,
      data.legajo
    );
    if (existing) {
      throw new Error("Ya existe un profesor con ese DNI o Legajo");
    }

    return await professorRepository.create(data);
  }
  //Esto aun falta
  async registerProfessorToAsignatura(data: any) {
    console.log("Datos recibidos para registrar profesor a asignatura:", data);
    if (!data.professorId || !data.asignaturaId || !data.rol || !data.horario) {
      throw new Error(
        "Los campos professorId, asignaturaId, rol y horario son obligatorios"
      );
    }

    const existing = await ProfessorAsignaturaModel.findOne({
      where: { professorId: data.professorId, asignaturaId: data.asignaturaId },
    });

    if (existing) {
      throw new Error("El profesor ya está asignado a esta asignatura");
    }

    return await ProfessorAsignaturaModel.create(data);
  }

  async registerAsignatura(data: any) {
    console.log("Datos recibidos para registrar asignaturas:");
    const existing = await AsignaturaModel.findOne({
      where: { nombre: data.nombre, dia: data.dia },
    });
    if (existing) {
      throw new Error("Ya existe una materia con ese nombre ");
    }
    return await AsignaturaModel.create(data);
  }

  //Busco Todos los profesores
  async searchProfessors(query: any) {
    return await professorRepository.findAll();
  }
  //Busco por estado
  async searchByState(state: boolean) {
    return await professorRepository.searchByState(state);
  }

  // Busco por ID
  async searchProfessorById(id: number) {
    const professor = await professorRepository.findById(id);
    if (!professor) {
      throw new Error("Profesor no encontrado");
    }
    return professor;
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
      throw new Error("Correo electrónico inválido");
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
        "El profesor está asignado a una o más asignaturas y no puede ser eliminado.",
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
