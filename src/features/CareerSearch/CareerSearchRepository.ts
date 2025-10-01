import type { Career } from '../../shared/models/career.model.js'; // Asegúrate de que la ruta sea correcta
import { Op } from 'sequelize';
import{CareerSearchInterface} from './CareerSearchInterface.js'; // Asegúrate de que la ruta sea correcta
import { CareerModel } from '../../shared/models/career.model.js'; // Asegúrate de que la ruta sea correcta

export class CareerSearchRepository implements CareerSearchInterface {
    
    
    async findByName(name: string): Promise<Career[] | null> {
        try {
            if (!name || typeof name !== 'string') {
                throw new Error('Invalid name parameter');
            }
            const query = {
                where: {
                    name: {
                        [Op.like]: `%${name.toLowerCase()}%`
                    }
                }
            };
            
            const Careers = await CareerModel.findAll(query);
                    
            return Careers ? Careers as Career[] : null;
        } catch (error) {
            console.error('Error searching for Career by name:', error);
            throw error;
        }
    }   

        



}
        