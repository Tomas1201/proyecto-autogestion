import type { Career } from '../../Shared/Models/CareerModel.js'; 
import { FindOptions } from 'sequelize';
export interface CareerSearchInterface {
  

  findByName(Name: string): Promise<Career[] | null>;

  
}