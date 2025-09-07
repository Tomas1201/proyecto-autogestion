

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

     // Se eliminó el valor por defecto para asegurar que la dependencia
    // siempre sea inyectada, cumpliendo estrictamente con el DIP.= new CareerRepository())
    constructor(careerRepository: CareerInterface ) {
        this.CareerRepository = careerRepository;
    }

    public async getAllCareers(): Promise<Career[]> {
     //Ahora la clase solo tiene lógica de negocio. No hay `try/catch` para errores de la base de datos, 
    // ya que esa es responsabilidad del repositorio. El servicio solo se preocupa de la
    // validez de los datos y de la lógica de la aplicación    
       
            const Careers = await this.CareerRepository.findAll();
            return Careers;
        
           
        }
    

    public async getCareerById(id: string): Promise<Career | null> {// Pero si aplicamos la libreria ZOD, se seguría implementando de esta forma la validación dela entrada?
        //  Validación de entrada para cumplir el SRP: el servicio es responsable
        // de la lógica de negocio, lo que incluye validar la entrada.
        if (!id || typeof id !== 'string') {
            throw new Error("Invalid ID provided.");
        }
        const Career = await this.CareerRepository.findById(id);
            return Career;
         
    }

    public async getCareersByName(Name: string): Promise<Career[] | null> {
      
      if (!Name || typeof Name !== 'string' || Name.trim() === '') {
            throw new Error("The name must be a non-empty string.");
        }
           
            const Careers = await this.CareerRepository.findByName(Name);
            return Careers; 
        
        }
    
 
    public async createCareer(CareerData: Career): Promise<Career> {
        
        
        if (!CareerData.Name || CareerData.Name.trim() === '') {
            

            throw new Error("The Career's Name is mandatory. ");
        }
        const ifExist = await CareerModel.findOne({ where: { Name: CareerData.Name } });
        
                    if (ifExist) {
                        
                        throw new Error(`The Career with  name '${CareerData.Name}' already exists.`);
                    }
        

            CareerData.Name = CareerData.Name.toLowerCase();

       
            const NewCareer = await this.CareerRepository.create(CareerData);
            return NewCareer;
       
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