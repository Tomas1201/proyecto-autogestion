import type { Career } from '../../../shared/models/career.model.js';
import { FindOptions } from 'sequelize';
export interface CareerSearchInterface {
  

  findByName(name: string): Promise<Career[] | null>;

  
}