
import { CareerInterface } from './CareerInterface.js';
import type { Career } from '../../Shared/Models/CareerModel.js'; // Asegúrate de que la ruta sea correcta
import { Op } from 'sequelize';
import { CareerModel } from '../../Shared/Models/CareerModel.js'; // Asegúrate de que la ruta sea correcta

export class CareerRepository implements CareerInterface {
    
    async findAll(): Promise<Career[]> {
         try {
            const Careers = await CareerModel.findAll();
            return Careers ? Careers as Career[] : [];
        } catch (error) {
            console.error('Error fetching all Careers:', error);
            throw new Error('Database error');
        }      
       
    }
    
    async findById(id: number): Promise<Career | null> {
        try {
            const Career = await CareerModel.findByPk(id);
            return Career ? Career as Career : null;
        } catch (error) {
            console.error('Error fetching Career by ID:', error);
            throw new Error('Database error');
        }
    }
    
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
    
      async create(CareerData: Career): Promise<Career> {
        try {
            
            
            const ifExist = await CareerModel.findOne({ where: { name: CareerData.Name } });

            if (ifExist) {
                
                throw new Error(`The Career with  name '${CareerData.Name}' already exists.`);
            }

            
            const NewCareer = await CareerModel.create(CareerData as any);
            return NewCareer as Career;

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
             console.error(`Error updating Career with ID ${id}:`, error);
             throw new Error('Error updating the Career');
            }
} 
    
    async delete(id: number): Promise<boolean> { 
        try {
            const rowsDeleted = await CareerModel.destroy({
                where: { id },
            });
            return rowsDeleted > 0;
        } catch (error) {
            console.error(`Error deleting Career with ID ${id}:`, error);
            throw new Error('Database error during deletion');
        }
    }      



}

    