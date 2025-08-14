

import { CareerModel, Career} from '../../Shared/Models/CareerModel.js'; 
import { CareerInterface } from './CareerInterface.js'; 
import { CareerRepository } from './CareerRepository.js'; 
import { FindOptions } from 'sequelize'; 


export interface ICareerService {
    getAllCareers(): Promise<Career[]>;
    getCareerById(Id: string): Promise<Career | null>;
    getCareersByName(Name: string): Promise<Career[] | null>;
    createCareer(CareerData: Career): Promise<Career>;
    UpdateCareer(Id: string, CareerData: Partial<Career>): Promise<boolean>;
   
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

    public async getCareerById(id: string): Promise<Career | null> {
        console.log(`Servicio: Solicitando Career por ID: ${id}`);
        try {
            
            const Career = await this.CareerRepository.findById(id);
            return Career;
        } catch (error) {
            console.error(`Servicio Error: Fallo al obtener la Career con ID ${id}.`, error);
            throw new Error(`No se pudo recuperar la Career con ID ${id} debido a un error.`);
        }
    }

    public async getCareersByName(Name: string): Promise<Career[] | null> {
        console.log(`Servicio: Solicitando Careers por Name: '${Name}'`);
        try {
           
            const Careers = await this.CareerRepository.findByName(Name);
            return Careers; 
        } catch (error) {
            console.error(`Servicio Error: Fallo al obtener Careers por Name '${Name}'.`, error);
            
            if (error instanceof Error && error.message.includes('Parámetro de Name inválido')) {
                throw error; 
            }
            throw new Error(`No se pudieron recuperar las Careers por Name '${Name}' debido a un error.`);
        }
    }
 
    public async createCareer(CareerData: Career): Promise<Career> {
        
        
        if (!CareerData.Name || CareerData.Name.trim() === '') {
            console.log('El Name de la Career es obligatorio.');

            throw new Error('El Name de la Career es obligatorio.');
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

    public async UpdateCareer(Id: string, CareerData: Career): Promise<boolean> {        

        try {
          

            const success = await this.CareerRepository.update(Id, CareerData);
            if (!success) {
                
                const exists = await this.CareerRepository.findById(Id);
                if (!exists) {
                    throw new Error(`The Career with ID  ${Id} was not found to update..`);
                }
                throw new Error(`Could not update Career with ID${Id}.`);
            }
            return success;
        } catch (error) {
            console.error(`Service Error: Failed to update Career with ID${Id}.`, error);
            throw error; 
        }
    }

   
}