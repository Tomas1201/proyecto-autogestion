import { C_AModel } from '../Database/CarreraAsignaturaModel.js';
import * as ScheduleService from './ScheduleService';
import { AsignaturaModel } from '../Database/AsignaturaModel.js';

export const AssignmentService = {
    assignProfessor: async (professorId: number, asignaturaId: number, rol: string) => {
        const asignatura = await AsignaturaModel.findByPk(asignaturaId) as { horarios: any } | null;
        if (!asignatura) throw new Error('Asignatura not found');
        
        const hasOverlap = await ScheduleService.checkScheduleOverlap(
            professorId, 
            asignatura.horarios
        );
        
        if (hasOverlap) {
            throw new Error('Schedule overlap detected');
        }

        return C_AModel.create({
            Professor_id: professorId,
            Asignatura_id: asignaturaId,
            rol
        });
    },

    unassignProfessor: async (assignmentId: number) => {
        return C_AModel.destroy({ where: { id: assignmentId } });
    },

    getByProfessor: async (professorId: number) => {
        return C_AModel.findAll({ 
            where: { Professor_id: professorId } 
        });
    }
};
