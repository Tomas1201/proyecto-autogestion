import {CareerModel} from '../../Shared/Models/CareerModel.js';
import { SubjectModel } from './SubjectModel.js';
//import {Career_Subject_model} from '../Career/Index.js';
import { sequelizeDB } from '../../Database/Sequelize.js';

const relationships = [
CareerModel,
SubjectModel,
sequelizeDB.sync()
];

export default relationships;