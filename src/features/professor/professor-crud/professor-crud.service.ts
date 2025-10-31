import professorRepository from "./professor-crud.repository.js";
import { ProfessorSubjectModel } from "../../../shared/models/professor-subject.model.js";
import { ProfessorModel } from "../../../shared/models/professor.model.js";
import { SubjectModel } from "../../../shared/models/subject.model.js";

export class ProfessorService {
  async registerProfessor(data: any) {
    const existing = await professorRepository.findByDniOrFileNumber(data.Dni);
    if (existing) {
      throw new Error("Professor with same DNI or file number already exists");
    }

    return await professorRepository.create(data);
  }

  async registerProfessorToSubject(data: any) {
    console.log("Data received for subject assignment:", data);
    if (!data.professorId || !data.subjectId || !data.role || !data.schedule) {
      throw new Error("professorId, subjectId, role and schedule are required");
    }

    const existing = await ProfessorSubjectModel.findOne({
      where: { professorId: data.professorId, subjectId: data.subjectId },
    });

    if (existing) {
      throw new Error("Professor already assigned to this subject");
    }

    return await ProfessorSubjectModel.create(data);
  }

  async registerSubject(data: any) {
    console.log("Data received for subject registration:", data);
    const existing = await SubjectModel.findOne({
      where: { name: data.name, day: data.day },
    });
    if (existing) {
      throw new Error("Subject with same name already exists");
    }
    return await SubjectModel.create(data);
  }

  async searchProfessors(query: any) {
    return await professorRepository.findAll();
  }

  async searchByState(state: boolean) {
    return await professorRepository.searchByState(state);
  }

  async searchProfessorById(id: number) {
    const professor = await professorRepository.findById(id);
    if (!professor) throw new Error("Professor not found");
    return professor;
  }

  async searchByName(name: string) {
    return await professorRepository.searchByName(name);
  }

  async searchByLastName(lastName: string) {
    return await professorRepository.searchByLastName(lastName);
  }

  async searchByDni(dni: string) {
    return await professorRepository.searchByDni(dni);
  }

  async searchByFileNumber(fileNumber: string) {
    return await professorRepository.searchByFileNumber(fileNumber);
  }

  async updateProfessor(id: number, data: Partial<any>) {
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new Error("Invalid email format");
    }
    return await professorRepository.updateById(id, data);
  }

  async deleteProfessor(id: number): Promise<number> {
    const assignments = await ProfessorSubjectModel.findAll({
      where: { professorId: id },
    });

    if (assignments.length > 0) {
      class CustomError extends Error {
        code: number;
        constructor(message: string, code: number) {
          super(message);
          this.code = code;
        }
      }
      throw new CustomError(
        "Professor is assigned to one or more subjects and cannot be deleted",
        400
      );
    }

    return await ProfessorModel.destroy({ where: { id } });
  }

  async archiveProfessor(id: number) {
    const professor = await professorRepository.archiveProfessorById(id);
    return professor;
  }

  async unarchiveProfessor(id: number) {
    const professor = await professorRepository.unarchiveProfessorById(id);
    return professor;
  }
}
