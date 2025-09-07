
import { CareerInterface } from './CareerInterface.js';
import type { Career } from '../../Shared/Models/CareerModel.js'; 
import { Op } from 'sequelize';
import { CareerModel } from '../../Shared/Models/CareerModel.js'; 

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
    
    async findById(id: string): Promise<Career | null> {
        try {
            console.log("ID EN REPOSSITORY"+id);
            const Career = await CareerModel.findByPk(id);
            return Career ? Career as Career : null;
        } catch (error) {
            console.error('Error fetching Career by ID:', error);
            throw new Error('Database error');
        }
    }
    
    async findByName(name: string): Promise<Career[] | null> {
        try {
            // La validación de entrada ya no es necesaria aquí, se traslada al servicio.
            const query = {
                where: {
                    name: {
                        [Op.like]: `%${name.toLowerCase()}%`
                    }
                }
            };
            
            const Careers = await CareerModel.findAll(query);
                    
            return Careers ? Careers as Career[] : [];
        } catch (error) {
            console.error('Error searching for Career by name:', error);
            throw error;
        }
    }
    
      async create(CareerData: Omit<Career, 'Id'> & { Name: string }): Promise<Career> {
        try {
            
            
            // Se elimina la validación de si la carrera existe, ya que
            // esa es una regla de negocio que le corresponde al servicio.

            
            const NewCareer = await CareerModel.create(CareerData);
            return NewCareer as Career;

        } catch (error) {
            console.error('Error creating Career:', error);
            
            throw error;
        }
    }
            
      
        

        
        async update(Id: string, CareerData: Partial<Career>): Promise<boolean> {
            try {
                const [rowsUpdated] = await CareerModel.update(CareerData, {
                 where: { Id },
           });

           return rowsUpdated > 0;
           } catch (error) {
             console.error(`Error updating Career with ID ${Id}:`, error);
             throw new Error('Error updating the Career');
            }
} 
    
    
     



}
          

           