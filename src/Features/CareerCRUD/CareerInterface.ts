import type { Career } from '../../Shared/Models/CareerModel.js'; // Asegúrate de que la ruta sea correcta
import { FindOptions } from 'sequelize';
export interface CareerInterface {
  findAll(queryOptions?: FindOptions): Promise<Career[]>;
  
  findById(id: number): Promise<Career | null>;

  findByName(name: string): Promise<Career[] | null>;

  create(CareerData: Career): Promise<Career>; 

  update(id: number, CareerData: Partial<Career>): Promise<boolean>; 

  delete(id: number): Promise<boolean>; 
}

