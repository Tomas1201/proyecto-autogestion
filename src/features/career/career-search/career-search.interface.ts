import type { Career } from '../../../shared/models/career.model.js';// Asegúrate de que la ruta sea correcta
import { FindOptions } from 'sequelize';
export interface CareerSearchInterface {
  

  findByName(name: string): Promise<Career[] | null>;

  
}