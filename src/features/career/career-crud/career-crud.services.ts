

import { CareerModel, Career} from '../../../shared/models/career.model.js'; 
import { CareerInterface } from './career-crud.interface.js'; 
import { CareerRepository } from './career-crud.repository.js'; 
import { FindOptions } from 'sequelize'; 


export interface ICareerService {
    getAllCareers(): Promise<Career[]>;
    getCareerById(id: number): Promise<Career | null>;
    getCareersByName(name: string): Promise<Career[] | null>;
    createCareer(CareerData: Career): Promise<Career>;
    updateCareer(id: number, CareerData: Partial<Career>): Promise<boolean>;
   
}

export class CareerService implements ICareerService {
    private CareerRepository: CareerInterface;

    
    constructor(careerRepository: CareerInterface = new CareerRepository()) {
        this.CareerRepository = careerRepository;
    }

    public async getAllCareers(): Promise<Career[]> {
        
        try {
            
            const careers = await this.CareerRepository.findAll();
            return careers;
        } catch (error) {
            console.error('Service Error: Failed to get all Careers.', error);
            
            throw new Error('Careers could not be retrieved due to an internal error.');
        }
    }

    public async getCareerById(id: number): Promise<Career | null> {
        
        try {
            if (id <= 0) {
                throw new Error('Invalid Career ID.');
            }
            const career = await this.CareerRepository.findById(id);
            return career;
        } catch (error) {
            console.error(`Service Error: Failed to get Career with ID ${id}.`, error);
            throw new Error(`Could not retrieve Career with ID ${id} due to an error.`);
        }
    }

    public async getCareersByName(name: string): Promise<Career[] | null> {
        console.log(`Service: Requesting Careers by Name: '${name}'`);
        try {
           
            const careers = await this.CareerRepository.findByName(name);
            return careers; 
        } catch (error) {
            console.error(`Service Error: Failed to get Careers by name '${name}'.`, error);
            
            if (error instanceof Error && error.message.includes('Invalid name parameter')) {
                throw error; 
            }
            throw new Error(`Careers could not be retrieved by name'${name}' due to an error.`);
        }
    }
 
    public async createCareer(CareerData: Career): Promise<Career> {
        
        
        if (!CareerData.name || CareerData.name.trim() === '') {
            console.log('The name of the Career is mandatory.');

            throw new Error('The name of the Career is mandatory.');
        }
        


        try {
            console.log(CareerData);
            const NewCareer = await this.CareerRepository.create(CareerData);
            return NewCareer;
        } catch (error: any) { 
            console.error('Service Error: Failed to create Career.', error);
                        
            throw new Error('The Career could not be created due to an internal error.');
        }
    }

    public async updateCareer(id: number, CareerData: Partial<Career>): Promise<boolean> {
        
        
        if (id <= 0) {
            throw new Error('Invalid Career ID for update.');
        }
        if (Object.keys(CareerData).length === 0) {
            throw new Error('No data was provided to update.');
        }
        

        try {
          

            const success = await this.CareerRepository.update(id, CareerData);
            if (!success) {
                
                const exists = await this.CareerRepository.findById(id);
                if (!exists) {
                    throw new Error(`The Career with ID  ${id} was not found to update..`);
                }
                throw new Error(`Could not update Career with ID${id}.`);
            }
            return success;
        } catch (error) {
            console.error(`Service Error: Failed to update Career with ID${id}.`, error);
            throw error; 
        }
    }

   
}