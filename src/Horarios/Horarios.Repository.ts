/*import { Horarios } from './Horario.Model.js';
import { Asignatura } from '../Asignatura/Asignatura.Model.js';
import { Carrera } from '../Carrera/CarreraModel.js';
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

  async findByCarrera(carreras: Carrera[]) {
    const carreraIds = carreras.map((c) => c.id);

    return await Horarios.findAll({
      include: [
        {
          model: Asignatura,
          where: {
            id_carrera: {
              [Op.in]: carreraIds,
            },
          },
        },
      ],
    });
  },

  async findByAsignature(asignaturas: Asignatura[]) {
    const asignaturaIds = asignaturas.map((a) => a.id);

    return await Horarios.findAll({
      where: {
        id_asignatura: {
          [Op.in]: asignaturaIds,
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
