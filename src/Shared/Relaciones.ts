import { Career } from './Models/CareerModel.js';
import { C_AModel } from './Models/Domain/CareerSubjectModel.js'; 
import { Subject } from './Models/SubjectModel.js'; 
import { Registration } from './Models/Domain/RegistrationModel.js';
import { Student } from './Models/StudentModel.js';
import {CycleElectiveModel} from './Models/Domain/CycleElectiveModel.js';
import { SequelizeDB } from '../Database/Sequelize.js';
import {SubjectPlanModel} from './Models/Domain/SubjectPlanModel.js';
import { CareerPlanModel } from './Models/Domain/CareerPlanModel.js';
import { AcademicPositionModel } from './Models/Domain/AcademicPositionModel.js';
import { StudentCareer } from './Models/Domain/StudentCareerModel.js';

import { Professor } from './Models/ProfessorModel.js';
import { Schedule } from './Models/Domain/ScheduleModel.js';
const a = [
  Student,
  CycleElectiveModel,
  AcademicPositionModel,
  CareerPlanModel,
  SubjectPlanModel,
  Professor,
  Schedule,
  Student.belongsToMany(Career, { through: StudentCareer, foreignKey: 'StudentId' }),
  Career.belongsToMany(Student, { through: StudentCareer, foreignKey: 'CareerId' }),
  Subject.belongsToMany(Career, { through: C_AModel, foreignKey: 'SubjectId' }),
  Career.belongsToMany(Subject, { through: C_AModel, foreignKey: 'CareerId' }),

 // Asignatura.hasMany(Inscriptos, { foreignKey: 'asignatura_id' }),
 // Inscriptos.belongsTo(Asignatura, { foreignKey: 'asignatura_id' }),
  Student.hasMany(Registration, { foreignKey: 'StudentId' }),
  Registration.belongsTo(Student, { foreignKey: 'StudentId' }),

  SequelizeDB.sync({ force:true})
];
export default a;