
import { CareerInterface } from './career-crud.interface.js';
import type { Career } from '../../../shared/models/career.model.js'; 
import { Op } from 'sequelize';
import { CareerModel } from '../../../shared/models/career.model.js'; 

export class CareerRepository implements CareerInterface {
    
    async findAll(): Promise<Career[]> {
         try {
            const careers = await CareerModel.findAll();
            return careers ? careers as Career[] : [];
        } catch (error) {
            console.error('Error fetching all Careers:', error);
            throw new Error('Database error');
        }      
       
    }
    
    async findById(id: number): Promise<Career | null> {
        try {
            const career = await CareerModel.findByPk(id);
            return career ? career as Career : null;
        } catch (error) {
            console.error('Error fetching Career by ID:', error);
            throw new Error('Database error');
        }
    }
    
    async findByName(name: string): Promise<Career[] | null> {
        try {
            if (!name || typeof name !== 'string') {
                throw new Error('Invalid Name Parameter');
            }
            const query = {
                where: {
                    name: {
                        [Op.like]: `%${name.toLowerCase()}%`
                    }
                }
            };
            
            const careers = await CareerModel.findAll(query);
                    
            return careers ? careers as Career[] : null;
        } catch (error) {
            console.error('Error searching for Career by name:', error);
            throw error;
        }
    }
    
      async create(CareerData: Omit<Career, 'Id'> & { name: string }): Promise<Career> {
        try {
            
            
            const ifExist = await CareerModel.findOne({ where: { name: CareerData.name } });

            if (ifExist) {
                
                throw new Error(`The Career with  name '${CareerData.name}' already exists.`);
            }

            
            const newCareer = await CareerModel.create(CareerData as any);
            return newCareer as Career;

        } catch (error) {
            console.error('Error creating Career:', error);
            
            throw error;
        }
    }
            
      
        

        
        async update(id: number, CareerData: Partial<Career>): Promise<boolean> {
            try {
                const [rowsUpdated] = await CareerModel.update(CareerData, {
                 where: { id },
           });

           return rowsUpdated > 0;
           } catch (error) {
             
             throw new Error('Error updating the Career');
            }
} 
    
    
     



}

           
