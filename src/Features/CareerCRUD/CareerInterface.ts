import type { Career } from '../../Shared/Models/CareerModel.js'; 
import { FindOptions } from 'sequelize';
export interface CareerInterface {
  findAll(queryOptions?: FindOptions): Promise<Career[]>;
 
  findById(Id: string): Promise<Career | null>;

  findByName(name: string): Promise<Career[] | null>;

  create(CareerData: Omit<Career, 'id'>): Promise<Career>; 

  update(Id: string, CareerData: Career): Promise<boolean>; 

  
}

