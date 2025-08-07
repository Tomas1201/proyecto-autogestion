import { ProfessorModel, Professor } from "../../../Shared/Models/ProfessorModel.js";
import { Op } from "sequelize";
import { ProfessorSubjectModel } from "../../../Shared/Models/ProfessorSubjectModel.js";
import { SubjectModel } from "../../../Shared/Models/SubjectModel.js";

export class ProfessorRepository {
  async create(data: any) {
    return await ProfessorModel.create(data);
  }
  
  async findById(id: number) {
    return await ProfessorModel.findByPk(id);
  }
  
  async findByNameAndDay(name: string, day: string) {
    return await SubjectModel.findOne({
      where: { name, day },
    });
  }

  async findByDniOrFileNumber(dni: string, fileNumber: string) {
    return await ProfessorModel.findOne({ where: { dni, fileNumber } });
  }

  async updateById(id: number, data: Partial<any>) {
    const professor = await ProfessorModel.findByPk(id);
    if (!professor) throw new Error("Professor not found");
    await professor.update(data);
    return professor;
  }

  async findAll(): Promise<Professor[]> {
    try {
      const professors = await ProfessorModel.findAll();
      return professors ? (professors as Professor[]) : [];
    } catch (error) {
      console.error("Error fetching professors:", error);
      throw new Error("Error fetching professors");
    }
  }

  async deleteById(id: number) {
    const professor = await ProfessorModel.findByPk(id);
    if (!professor) throw new Error("Professor not found");
    await ProfessorModel.destroy();
    return;
  }

  async checkProfessorAssignments(professorId: number) {
    return await ProfessorSubjectModel.findAll({
      where: { professorId },
    });
  }
  
  async searchByState(state: boolean) {
    try {
      const professors = await ProfessorModel.findAll({
        where: { state },
      });
      return professors ? (professors as Professor[]) : [];
    } catch (error) {
      console.error("Error fetching professors by state:", error);
      throw new Error("Error fetching professors by state");
    }
  }

  async archiveProfessorById(professorId: number) {
    const professor = await ProfessorModel.findByPk(professorId);
    if (!professor) throw new Error("Professor not found");
    if (professor.get("state") !== true)
      throw new Error("Professor is already archived");
    await professor.update({ state: false });
    return professor;
  }

  async unarchiveProfessorById(professorId: number) {
    const professor = await ProfessorModel.findByPk(professorId);
    if (!professor) throw new Error("Professor not found");
    if (professor.get("state") !== false)
      throw new Error("Professor is already active");
    await professor.update({ state: true });
    return professor;
  }

  async searchByName(name: string) {
    try {
      const professors = await ProfessorModel.findAll({
        where: { firstName: { [Op.like]: `%${name}%` } },
      });
      return professors ? (professors as Professor[]) : [];
    } catch (error) {
      console.error("Error fetching professors by name:", error);
      throw new Error("Error fetching professors by name");
    }
  }
  
  async searchByLastName(lastName: string) {
    try {
      const professors = await ProfessorModel.findAll({
        where: { lastName: { [Op.like]: `%${lastName}%` } },
      });
      return professors ? (professors as Professor[]) : [];
    } catch (error) {
      console.error("Error fetching professors by last name:", error);
      throw new Error("Error fetching professors by last name");
    }
  }
  
  async searchByDni(dni: string) {
    try {
      const professor = await ProfessorModel.findAll({ where: { dni } });
      return professor ? (professor as Professor[]) : [];
    } catch (error) {
      console.error("Error fetching professor by DNI:", error);
      throw new Error("Error fetching professor by DNI");
    }
  }
  
  async searchByFileNumber(fileNumber: string) {
    try {
      const professor = await ProfessorModel.findAll({ where: { fileNumber } });
      return professor ? (professor as Professor[]) : [];
    } catch (error) {
      console.error("Error fetching professor by file number:", error);
      throw new Error("Error fetching professor by file number");
    }
  }
}
const professorRepository = new ProfessorRepository();
export default professorRepository;