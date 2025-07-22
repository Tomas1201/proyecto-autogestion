import {CarreraModel} from '../Carrera/CarreraModel.js';
import { AsignaturaModel } from '../Asignatura/Asignatura.Model.js';
//import {carrera_asignatura_model} from '../Carrera/Index.js';

const relaciones = [
CarreraModel,
AsignaturaModel,
CarreraModel.belongsToMany(AsignaturaModel, {
  through: 'carrera_asignatura',  // nombre de la tabla intermedia
  foreignKey: 'carreraId',
  otherKey: 'asignaturaId',
  as: 'asignaturas',
}),

AsignaturaModel.belongsToMany(CarreraModel, {
  through: 'carrera_asignatura',
  foreignKey: 'asignaturaId',
  otherKey: 'carreraId',
  as: 'carreras',//Dfine loos metodos de las relaciones.
}),

];

export default relaciones;