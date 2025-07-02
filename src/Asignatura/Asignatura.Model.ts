import { Sequelize, DataTypes, Model } from 'sequelize';



import {Carrera} from '../Carrera/CarreraModel'; // ✅ Usa import default si Carrera es exportado con `export default`

import sequelizeDB from '../Database/Sequelize'; 
export class Asignatura extends Model {
    public id!: number;
  public nombre!: string;
 public planificacion!:object;//JSONNN
 public horasCatedra!:number;
 
  public descripcion!: string;

 
  // Sequelize añade automáticamente createdAt y updatedAt si `timestamps: true`
  
 public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}
 

// ✅ Define el modelo correctamente
sequelizeDB.define('Asignatura', {//terminarr
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'Asignatura', // ✅ tableName va aquí, no dentro de los atributos
});

// ✅ Asocia el modelo después de definirlo
Asignatura.belongsTo(Carrera, {
  foreignKey: 'carreraId',
  as: 'carrera',
});

export default Asignatura;

sequelizeDB.sync();
export const AsignaturaModel = sequelizeDB.models.Asignatura;