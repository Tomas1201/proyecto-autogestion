import { Carrera } from './CarreraModel.ts';
import Asignatura from './AsignaturaModel';

// Relación N:M
Carrera.belongsToMany(Asignatura, {
  through: 'carrera_asignatura',  // nombre de la tabla intermedia
  foreignKey: 'carreraId',
  otherKey: 'asignaturaId',
  as: 'asignaturas',
});

Asignatura.belongsToMany(Carrera, {
  through: 'carrera_asignatura',
  foreignKey: 'asignaturaId',
  otherKey: 'carreraId',
  as: 'carreras',//Dfine loos metodos de las relaciones.
});

export {
  
  Carrera,
  Asignatura,
};
