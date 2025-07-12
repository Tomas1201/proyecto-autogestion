import { CarreraModel } from '../Models/CarrerasModel.js';
import { C_AModel } from '../Models/CarreraAsignaturaModel.js'; 
import { AsignaturaModel } from '../Models/AsignaturaModel.js'; 
import { InscriptosModel } from '../Models/inscriptosModel.js';
import { AlumnoModel} from '../Models/AlumnoModel.js';
import { SequelizeDB } from './Sequelize.js';
const a = [
  AsignaturaModel.belongsToMany(CarreraModel, { through: C_AModel, foreignKey: 'Asignatura_id' }),
  CarreraModel.belongsToMany(AsignaturaModel, { through: C_AModel, foreignKey: 'Carrera_id' }),

  AsignaturaModel.hasMany(InscriptosModel, { foreignKey: 'asignatura_id' }),
  InscriptosModel.belongsTo(AsignaturaModel, { foreignKey: 'asignatura_id' }),
  CarreraModel.hasMany(InscriptosModel, { foreignKey: 'Carrera_id' }),
  InscriptosModel.belongsTo(CarreraModel, { foreignKey: 'Carrera_id' }),
  AlumnoModel.hasMany(InscriptosModel, { foreignKey: 'Alumno_id' }),
  InscriptosModel.belongsTo(AlumnoModel, { foreignKey: 'Alumno_id' }),

  SequelizeDB.sync()
    
];
export default a;