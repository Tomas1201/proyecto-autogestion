import { Asignatura } from "../Database/AsignaturaModel.js";
import { ProfessorAsignatura } from "../Database/ProfessorAsignaturaModel.js";

export class ScheduleService {
  async verificarDisponibilidad(
    profesorId: number,
    nuevasAsignaturas: number[]
  ) {
    const asignacionesActuales = await ProfessorAsignatura.findAll({
      where: { profesorId },
    });

    const idsAsignaturasActuales = asignacionesActuales.map(
      (a) => a.asignaturaId
    );
    const todasAsignaturas = await Asignatura.findAll({
      where: { id: [...idsAsignaturasActuales, ...nuevasAsignaturas] },
    });

    const actuales = todasAsignaturas.filter((a) =>
      idsAsignaturasActuales.includes(a.id)
    );
    const nuevas = todasAsignaturas.filter((a) =>
      nuevasAsignaturas.includes(a.id)
    );

    for (const nueva of nuevas) {
      for (const actual of actuales) {
        if (
          nueva.dia === actual.dia &&
          nueva.horaInicio < actual.horaFin &&
          nueva.horaFin > actual.horaInicio
        ) {
          throw new Error(
            `Conflicto de horario con asignatura existente el ${nueva.dia} de ${nueva.horaInicio} a ${nueva.horaFin}`
          );
        }
      }
    }
  }
}
