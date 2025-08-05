import { Career } from '../Models/DependentEntities/CareerModel.js';
import { C_AModel } from '../Models/MiddleTables/CarreraAsignaturaModel.js'; 
import { Subject } from '../Models/Entities/SubjectModel.js'; 
import { Registration } from '../Models/DependentEntities/RegistrationModel.js';
import { Student} from '../Models/Entities/StudentModel.js';
import {CicloElectivoModel} from '../Shared/Models/Domain/CicloElectivoModel.js';
import { SequelizeDB } from './Sequelize.js';
import {SubjectPlanModel} from '../Models/DependentEntities/SubjectPlanModel.js';
import { CareerPlanModel } from '../Shared/Models/Domain/CareerPlanModel.js';
import { AcademicPositionModelModel } from '../Models/DependentEntities/AcademicPositionModel.js';
import { AlumnoCarrera } from '../Models/MiddleTables/AlumnoCarreraModel.js';

import { Professor } from '../Models/Entities/ProfessorModel.js';
import { Horario } from '../Models/Entities/HorarioModel.js';
const a = [
  CicloElectivoModel,
  AcademicPositionModelModel,
  CareerPlanModel,
  SubjectPlanModel,
  Professor,
  Horario,
  Student.belongsToMany(Career, { through: AlumnoCarrera, foreignKey: 'alumnoId' }),
  Career.belongsToMany(Student, { through: AlumnoCarrera, foreignKey: 'carreraId' }),
  Subject.belongsToMany(Career, { through: C_AModel, foreignKey: 'asignatura_id' }),
  Career.belongsToMany(Subject, { through: C_AModel, foreignKey: 'carrera_id' }),

 // Asignatura.hasMany(Inscriptos, { foreignKey: 'asignatura_id' }),
 // Inscriptos.belongsTo(Asignatura, { foreignKey: 'asignatura_id' }),
  Student.hasMany(Registration, { foreignKey: 'alumno_id' }),
  Registration.belongsTo(Student, { foreignKey: 'alumno_id' }),

  SequelizeDB.sync(),
    
];
export default a;