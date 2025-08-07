import {CareerModel} from '../Career/CareerModel.js';
import { SubjectModel } from '../Subject/SubjectModel.js';
//import {Career_Subject_model} from '../Career/Index.js';

const relationships = [
CareerModel,
SubjectModel,
CareerModel.belongsToMany(SubjectModel, {
  through: 'Career_Subject',  // name de la tabla intermedia
  foreignKey: 'CareerId',
  otherKey: 'SubjectId',
  as: 'Subjects',
}),

SubjectModel.belongsToMany(CareerModel, {
  through: 'CareerSubject',
  foreignKey: 'subjectId',
  otherKey: 'CareerId',
  as: 'Careers',//Dfine loos metodos de las relaciones.
}),

];

export default relationships;