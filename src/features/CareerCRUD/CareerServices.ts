

import { CareerModel, Career} from '../../shared/models/career.model.js'; 
import { CareerInterface } from './CareerInterface.js'; 
import { CareerRepository } from './CareerRepository.js'; 
import { FindOptions } from 'sequelize'; 


export interface ICareerService {
    getAllCareers(): Promise<Career[]>;
    getCareerById(id: number): Promise<Career | null>;
    getCareersByName(name: string): Promise<Career[] | null>;
    createCareer(CareerData: Career): Promise<Career>;
    UpdateCareer(id: number, CareerData: Partial<Career>): Promise<boolean>;
   
}

export class CareerService implements ICareerService {
    private CareerRepository: CareerInterface;

    
    constructor(careerRepository: CareerInterface = new CareerRepository()) {
        this.CareerRepository = careerRepository;
    }

    public async getAllCareers(): Promise<Career[]> {
        
        try {
            
            const Careers = await this.CareerRepository.findAll();
            return Careers;
        } catch (error) {
            console.error('Service Error: Failed to get all Careers.', error);
            
            throw new Error('Careers could not be retrieved due to an internal error.');
        }
    }

    public async getCareerById(id: number): Promise<Career | null> {
        
        try {
            if (id <= 0) {
                throw new Error('ID de Career inválido.');
            }
            const Career = await this.CareerRepository.findById(id);
            return Career;
        } catch (error) {
            console.error(`Servicio Error: Fallo al obtener la Career con ID ${id}.`, error);
            throw new Error(`No se pudo recuperar la Career con ID ${id} debido a un error.`);
        }
    }

    public async getCareersByName(name: string): Promise<Career[] | null> {
        console.log(`Servicio: Solicitando Careers por name: '${name}'`);
        try {
           
            const Careers = await this.CareerRepository.findByName(name);
            return Careers; 
        } catch (error) {
            console.error(`Servicio Error: Fallo al obtener Careers por name '${name}'.`, error);
            
            if (error instanceof Error && error.message.includes('Parámetro de name inválido')) {
                throw error; 
            }
            throw new Error(`No se pudieron recuperar las Careers por name '${name}' debido a un error.`);
        }
    }
 
    public async createCareer(CareerData: Career): Promise<Career> {
        
        
        if (!CareerData.Name || CareerData.Name.trim() === '') {
            console.log('El name de la Career es obligatorio.');

            throw new Error('El name de la Career es obligatorio.');
        }
        


        try {
            console.log(CareerData);
            const NewCareer = await this.CareerRepository.create(CareerData);
            return NewCareer;
        } catch (error: any) { 
            console.error('Servicio Error: Fallo al crear Career.', error);
                        
            throw new Error('The Career could not be created due to an internal error.');
        }
    }

    public async UpdateCareer(id: number, CareerData: Partial<Career>): Promise<boolean> {
        
        
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