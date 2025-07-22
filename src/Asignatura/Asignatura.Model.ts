import {  DataTypes, Model } from 'sequelize';

import {CarreraModel} from '../Carrera/CarreraModel.js'; // ✅ Usa import default si Carrera es exportado con `export default`

import {sequelizeDB} from '../Database/Sequelize.js'; 
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
 
  },
  horasCatedra:{ 
    type: DataTypes.INTEGER,
    allowNull: false,


  },
  planificacion: {
    type: DataTypes.JSON, // Usa JSON para almacenar objetos
    allowNull: true, // Permite que sea nulo si no hay planificación
  },
}, {
  tableName: 'Asignatura', // ✅ tableName va aquí, no dentro de los atributos
 
  timestamps: true,
   indexes: [
    {
      unique: true,
      fields: [{ name: 'descripcion', length: 255 }],}],
});

/*
Asignatura.belongsTo(CarreraModel, {
  foreignKey: 'carreraId',
  as: 'carrera',
});*/



sequelizeDB.sync();
export const AsignaturaModel = sequelizeDB.models.Asignatura;