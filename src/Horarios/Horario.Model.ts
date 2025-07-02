import { Sequelize, DataTypes, Model } from 'sequelize';

import sequelizeDB from '../Database/Sequelize'; 
export class Horarios extends Model {
    public id!: number;
  public hora_init!:Date;
  public hora_fin!: Date;

  // Sequelize añade automáticamente createdAt y updatedAt si `timestamps: true`
  
 public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}


sequelizeDB.define('Horarios', {
  id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    hora_init: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    hora_fin: {
        type: DataTypes.DATE,
        allowNull: false,
    },
  

}, {
  tableName: 'Horarios',
});

//export default Carrera;


sequelizeDB.sync();
export const HorarioModel = sequelizeDB.models.Horarios;