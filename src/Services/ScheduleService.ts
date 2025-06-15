import { C_AModel } from '../Database/CarreraAsignaturaModel.js';
import { AsignaturaModel } from '../Database/AsignaturaModel.js';

function horariosSolapados(horario1: any, horario2: any): boolean {
    if (!horario1 || !horario2) return false;
    
    return horario1.dia === horario2.dia && 
           horario1.horaInicio < horario2.horaFin && 
           horario1.horaFin > horario2.horaInicio;
}

export const checkScheduleOverlap = async (professorId: number, newSchedule: any) => {
    const assignments = await C_AModel.findAll({ 
        where: { Professor_id: professorId },
        include: [{
            model: AsignaturaModel,
            as: 'Asignatura', // Ensure alias matches the expected property name
            required: true
        }]
    });
    
        for (const assignment of assignments) {
            if (horariosSolapados((assignment as any).Asignatura.horarios, newSchedule)) {
                return true; // Return true if any schedule overlaps
            }
        }
        return false; // Return false if no overlaps are found
    };
