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
import { Attendance } from "./models/domain/attendance.model.js";
import { Exam } from "./models/domain/exam.model.js";
import { Grade } from "./models/domain/grade.model.js";
import { FinalExam } from "./models/domain/final-exam.model.js";
import { FinalExamRegistration } from "./models/domain/final-exam-registration.model.js";

const relations = [
  Student,
  CycleElectiveModel,
  AcademicPositionModel,
  CareerPlanModel,
  SubjectPlanModel,
  Professor,
  Schedule,
  UserModel,
  Attendance,
  Exam,
  Grade,
  FinalExam,
  FinalExamRegistration,

  // Student - Career
  Student.belongsToMany(Career, {
    through: StudentCareer,
    foreignKey: "StudentId",
  }),
  Career.belongsToMany(Student, {
    through: StudentCareer,
    foreignKey: "CareerId",
  }),

  // Subject - Career
  Subject.belongsToMany(Career, { through: C_AModel, foreignKey: "SubjectId" }),
  Career.belongsToMany(Subject, { through: C_AModel, foreignKey: "CareerId" }),

  // Registration
  Student.hasMany(Registration, { foreignKey: "StudentId" }),
  Registration.belongsTo(Student, { foreignKey: "StudentId" }),

  // Schedule - AcademicPosition
  AcademicPositionModel.hasMany(Schedule, { foreignKey: "academicPositionId" }),
  Schedule.belongsTo(AcademicPositionModel, { foreignKey: "academicPositionId" }),

  // Attendance
  AcademicPositionModel.hasMany(Attendance, { foreignKey: "academicPositionId" }),
  Attendance.belongsTo(AcademicPositionModel, { foreignKey: "academicPositionId" }),
  Student.hasMany(Attendance, { foreignKey: "studentId" }),
  Attendance.belongsTo(Student, { foreignKey: "studentId" }),

  // Exams & Grades
  AcademicPositionModel.hasMany(Exam, { foreignKey: "academicPositionId" }),
  Exam.belongsTo(AcademicPositionModel, { foreignKey: "academicPositionId" }),

  Exam.hasMany(Grade, { foreignKey: "examId" }),
  Grade.belongsTo(Exam, { foreignKey: "examId" }),
  Student.hasMany(Grade, { foreignKey: "studentId" }),
  Grade.belongsTo(Student, { foreignKey: "studentId" }),

  // Final Exams
  Subject.hasMany(FinalExam, { foreignKey: "subjectId" }),
  FinalExam.belongsTo(Subject, { foreignKey: "subjectId" }),
  Professor.hasMany(FinalExam, { foreignKey: "professorId" }),
  FinalExam.belongsTo(Professor, { foreignKey: "professorId" }),

  // Final Exam Registration
  FinalExam.hasMany(FinalExamRegistration, { foreignKey: "finalExamId" }),
  FinalExamRegistration.belongsTo(FinalExam, { foreignKey: "finalExamId" }),
  Student.hasMany(FinalExamRegistration, { foreignKey: "studentId" }),
  FinalExamRegistration.belongsTo(Student, { foreignKey: "studentId" }),

  SequelizeDB.sync({ force: true })
];
export default relations;
