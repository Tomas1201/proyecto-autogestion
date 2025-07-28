import { Carrera } from '../Models/CarrerasModel.js';
import { C_AModel } from '../Models/CarreraAsignaturaModel.js'; 
import { Asignatura } from '../Models/AsignaturaModel.js'; 
import { Inscriptos } from '../Models/inscriptosModel.js';
import { Alumno} from '../Models/AlumnoModel.js';
import {CicloElectivoModel} from '../Models/CicloElectivoModel.js';
import { SequelizeDB } from './Sequelize.js';
import {AsignaturaPlanModel} from '../Models/AsignaturaPlanModel.js';
import { PlanCarreraModel } from '../Models/PlanCarreraModel.js';
import { PuestoAcademicoModel } from '../Models/PuestoAcademicoModel.js';
import { AlumnoCarrera } from '../Models/AlumnoCarreraModel.js';

import { Professor } from '../Models/ProfessorModel.js';
import { Horario } from '../Models/HorarioModel.js';
const a = [
  CicloElectivoModel,
  AsignaturaPlanModel,
  PlanCarreraModel,
  PuestoAcademicoModel,
  Professor,
  Horario,
  Alumno.belongsToMany(Carrera, { through: AlumnoCarrera, foreignKey: 'alumnoId' }),
  Carrera.belongsToMany(Alumno, { through: AlumnoCarrera, foreignKey: 'carreraId' }),
  Asignatura.belongsToMany(Carrera, { through: C_AModel, foreignKey: 'asignatura_id' }),
  Carrera.belongsToMany(Asignatura, { through: C_AModel, foreignKey: 'carrera_id' }),

 // Asignatura.hasMany(Inscriptos, { foreignKey: 'asignatura_id' }),
 // Inscriptos.belongsTo(Asignatura, { foreignKey: 'asignatura_id' }),
  Alumno.hasMany(Inscriptos, { foreignKey: 'alumno_id' }),
  Inscriptos.belongsTo(Alumno, { foreignKey: 'alumno_id' }),

  SequelizeDB.sync(),
    
];
export default a;