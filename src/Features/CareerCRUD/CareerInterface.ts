import type { Career } from '../../Shared/Models/CareerModel.js'; // Asegúrate de que la ruta sea correcta
import { FindOptions } from 'sequelize';
export interface CareerInterface {
  findAll(queryOptions?: FindOptions): Promise<Career[]>;/* */
  /*Esto especifica el tipo de datos que contendrá la promesa cuando se resuelva exitosamente. 
  En este caso, será un array ([]) de objetos de tipo Career.
   Esto significa que cada elemento dentro del array será una instancia de tu modelo o interfaz Career. */
  findById(id: number): Promise<Career | null>;

  findByName(name: string): Promise<Career[] | null>;

  create(CareerData: Omit<Career, 'id'>): Promise<Career>; 

  update(id: number, CareerData: Partial<Career>): Promise<boolean>; 

  delete(id: number): Promise<boolean>; 
}

