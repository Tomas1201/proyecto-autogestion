import { ScheduleService } from "./ScheduleService.js";
import { ProfessorAsignatura } from "../Database/ProfessorAsignaturaModel.js";

const scheduleService = new ScheduleService();

export class AssignmentService {
  async assign(profesores: number[], asignaturas: number[], rol: string) {
    if (!rol || !["titular", "adjunto", "ayudante"].includes(rol)) {
      throw new Error("Rol inválido");
    }

    for (const profesorId of profesores) {
      await scheduleService.verificarDisponibilidad(profesorId, asignaturas);
    }

    const asignaciones = profesores.flatMap((profesorId) =>
      asignaturas.map((asignaturaId) => ({
        profesorId,
        asignaturaId,
        rol,
      }))
    );

    return await ProfessorAsignatura.bulkCreate(asignaciones);
  }

  async unassign(profesorId: number, asignaturaId: number) {
    const deleted = await ProfessorAsignatura.destroy({
      where: {
        profesorId,
        asignaturaId,
      },
    });

    if (deleted === 0) {
      throw new Error("La asignación no existe o ya fue eliminada.");
    }

    return { message: "Desvinculación exitosa" };
  }
}
