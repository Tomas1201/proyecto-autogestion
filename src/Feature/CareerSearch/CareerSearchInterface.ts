import type { Career } from '../../Models/Career/CareerModel.js'; // Asegúrate de que la ruta sea correcta
import { FindOptions } from 'sequelize';
export interface CareerSearchInterface {
  

  findByName(name: string): Promise<Career[] | null>;

  
}