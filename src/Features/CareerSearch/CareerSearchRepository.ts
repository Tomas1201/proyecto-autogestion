import type { Career } from '../../Shared/Models/CareerModel.js';
import { Op } from 'sequelize';
import{CareerSearchInterface} from './CareerSearchInterface.js'; 
import { CareerModel } from '../../Shared/Models/CareerModel.js';

export class CareerSearchRepository implements CareerSearchInterface {
    
    
    async findByName(Name: string): Promise<Career[] | null> {
        try {
            if (!Name || typeof Name !== 'string') {
                throw new Error('Invalid Name parameter');
            }
            const query = {
                where: {
                    Name: {
                        [Op.like]: `%${Name.toLocaleLowerCase()}%`
                    }
                }
            };
            
            const Careers = await CareerModel.findAll(query);
                    
            return Careers ? Careers as Career[] : null;
        } catch (error) {
            console.error('Error searching for Career by Name:', error);
            throw error;
        }
    }   

        



}
        