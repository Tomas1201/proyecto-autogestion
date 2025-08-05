/*Revisando implementacion, sujeto a remocion */

import {Model, DataTypes} from 'sequelize';
import { SequelizeDB } from '../../Database/Sequelize.js';


/*
Relacion entre alumnos inscriptos a carreras
 */
export class AlumnoCarrera extends Model {
    public id!: number;
    public alumnoId!: number;
    public carreraId!: number;
    public PlanCarreraId!: number;
    public state!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AlumnoCarrera.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    alumnoId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Alumnos', // Nombre de la tabla referenciada
            key: 'id' // Clave primaria de la tabla referenciada
        }
    },
    carreraId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Carreras', // Nombre de la tabla referenciada
            key: 'id' // Clave primaria de la tabla referenciada
        }
    },
    planCarreraId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'PlanCarrera', // Nombre de la tabla referenciada
            key: 'id' // Clave primaria de la tabla referenciada
        }
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active', // Estado por defecto
    },

    
}, {
    sequelize: SequelizeDB,
    modelName: 'AlumnoCarrera',
    tableName: 'alumno_carrera',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});

