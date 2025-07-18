/*import { Carrera } from './CarreraModel.js';
import Asignatura from '../Asignatura/Asignatura.Model.js';
import { sequelize } from '../Database/Sequelize.js';
import { DataTypes } from 'sequelize';

sequelize.define('carrera_asignatura', {
  carreraId: {
    type: DataTypes.INTEGER,
    references: {
      model: Carrera,
      key: 'id',
    },  
  
  },
  asignaturaId: {
    type: DataTypes.INTEGER,
    references: {
      model: Asignatura,
      key: 'id',
    },
  },
}, {
  tableName: 'carrera_asignatura', // Nombre de la tabla intermedia
  timestamps: false, // No necesitamos createdAt y updatedAt para la tabla intermedia
}
  
  );


// Relación N:M

Carrera.belongsToMany(Asignatura, {
  through: 'carrera_asignatura',  // nombre de la tabla intermedia
  foreignKey: 'carreraId',
  otherKey: 'asignaturaId',
  as: 'asignaturas',
});

Asignatura.belongsToMany(Carrera, {
  through: 'carrera_asignatura',
  foreignKey: 'asignaturaId',
  otherKey: 'carreraId',
  as: 'carreras',//Dfine loos metodos de las relaciones.
});

export {
  
  Carrera,
  Asignatura,
};*/
