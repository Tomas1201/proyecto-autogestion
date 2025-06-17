import { CarreraRepository } from '../Repositories/Carrera.repository';

export const CarreraService = {
  obtenerCarrerasConAsignaturas: () => CarreraRepository.findAllWithAsignaturas(),

  crearCarreraConAsignaturas: (carreraData, asignaturaIds) =>
    CarreraRepository.createWithAsignaturas(carreraData, asignaturaIds)
};
