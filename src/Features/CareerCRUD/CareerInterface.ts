import type { Career } from '../../Shared/Models/CareerModel.js'; 
import { FindOptions } from 'sequelize';
export interface CareerInterface {
  findAll(queryOptions?: FindOptions): Promise<Career[]>;
 
  findById(id: number): Promise<Career | null>;

  findByName(name: string): Promise<Career[] | null>;

  create(CareerData: Omit<Career, 'id'>): Promise<Career>; 

  update(id: number, CareerData: Partial<Career>): Promise<boolean>; 

  
}

