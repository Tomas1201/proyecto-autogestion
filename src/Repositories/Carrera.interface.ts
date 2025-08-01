import type { Carrera } from '../Models/Entities/CarreraModel.js'; // Asegúrate de que la ruta sea correcta
import { FindOptions } from 'sequelize';
export interface CarreraInterface {
  findAll(queryOptions?: FindOptions): Promise<Carrera[]>;/* */
  /*Esto especifica el tipo de datos que contendrá la promesa cuando se resuelva exitosamente. 
  En este caso, será un array ([]) de objetos de tipo Carrera.
   Esto significa que cada elemento dentro del array será una instancia de tu modelo o interfaz Carrera. */
  findById(id: number): Promise<Carrera | null>;

  findByName(name: string): Promise<Carrera[] | null>;

  create(carreraData: Omit<Carrera, 'id'>): Promise<Carrera>; 

  update(id: number, carreraData: Partial<Carrera>): Promise<boolean>; 

  delete(id: number): Promise<boolean>; 
}

