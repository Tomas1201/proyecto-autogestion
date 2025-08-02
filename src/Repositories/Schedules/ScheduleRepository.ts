/*import { Horarios } from './Horario.Model.js';
import { Subject } from '../Subject/Subject.Model.js';
import { Career } from '../Career/CareerModel.js';
import { HorariosInterface } from './Horario.interface.js';
import { Op } from 'sequelize';
/*
export const HorariosRepository: HorariosInterface = {
  async findAll() {
    return await Horarios.findAll();
  },

  async findById(id: number) {
    return await Horarios.findByPk(id);
  },

  async findByCareer(Careers: Career[]) {
    const CareerIds = Careers.map((c) => c.id);

    return await Horarios.findAll({
      include: [
        {
          model: Subject,
          where: {
            id_Career: {
              [Op.in]: CareerIds,
            },
          },
        },
      ],
    });
  },

  async findByAsignature(Subjects: Subject[]) {
    const SubjectIds = Subjects.map((a) => a.id);

    return await Horarios.findAll({
      where: {
        id_Subject: {
          [Op.in]: SubjectIds,
        },
      },
    });
  },
/*
  async create(horarioData) {
    return await Horarios.create(horarioData);
  },

  async update(id: number, horarioData) {
    try {
      const [updated] = await Horarios.update(horarioData, {
        where: { id },
      });

      return updated > 0;
    } catch (error) {
      console.error('Error al actualizar horario:', error);
      throw new Error('Error al actualizar horario');
    }
  },
};*/
