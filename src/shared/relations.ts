import { Career } from "./models/career.model.js";
import { C_AModel } from "./models/domain/career-subject.model.js";
import { Subject } from "./models/subject.model.js";
import { Registration } from "./models/domain/registration.model.js";
import { Student } from "./models/student.model.js";
import { CycleElectiveModel } from "./models/domain/cycle-electivo.model.js";
import { SequelizeDB } from "../database/sequelize.js";
import { SubjectPlanModel } from "./models/domain/subject-plan.model.js";
import { CareerPlanModel } from "./models/domain/career-plan.model.js";
import { AcademicPositionModel } from "./models/domain/academic-position.model.js";
import { StudentCareer } from "./models/domain/student-career.model.js";
import { UserModel } from "../features/auth/users.model.js";

import { Professor } from "./models/professor.model.js";
import { Schedule } from "./models/domain/schedule.model.js";
const relations = [
  Student,
  CycleElectiveModel,
  AcademicPositionModel,
  CareerPlanModel,
  SubjectPlanModel,
  Professor,
  Schedule,
  UserModel,
  Student.belongsToMany(Career, {
    through: StudentCareer,
    foreignKey: "StudentId",
  }),
  Career.belongsToMany(Student, {
    through: StudentCareer,
    foreignKey: "CareerId",
  }),
  Subject.belongsToMany(Career, { through: C_AModel, foreignKey: "SubjectId" }),
  Career.belongsToMany(Subject, { through: C_AModel, foreignKey: "CareerId" }),
  Student.hasMany(Registration, { foreignKey: "StudentId" }),
  Registration.belongsTo(Student, { foreignKey: "StudentId" }),

  SequelizeDB.sync({ force: true }),
];
export default relations;
