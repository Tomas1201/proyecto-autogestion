import { Carrera } from '../Models/DependentEntities/CarrerasModel.js';
import { C_AModel } from '../Models/MiddleTables/CarreraAsignaturaModel.js'; 
import { Asignatura } from '../Models/Entities/AsignaturaModel.js'; 
import { Inscriptos } from '../Models/DependentEntities/inscriptosModel.js';
import { Alumno} from '../Models/Entities/AlumnoModel.js';
import {CicloElectivoModel} from '../Models/Entities/CicloElectivoModel.js';
import { SequelizeDB } from './Sequelize.js';
import {AsignaturaPlanModel} from '../Models/DependentEntities/AsignaturaPlanModel.js';
import { PlanCarreraModel } from '../Models/DependentEntities/PlanCarreraModel.js';
import { PuestoAcademicoModel } from '../Models/DependentEntities/PuestoAcademicoModel.js';
import { AlumnoCarrera } from '../Models/MiddleTables/AlumnoCarreraModel.js';

import { Professor } from '../Models/Entities/ProfessorModel.js';
import { Horario } from '../Models/Entities/HorarioModel.js';
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

  SequelizeDB.sync({force: true}),
    
];
export default a;