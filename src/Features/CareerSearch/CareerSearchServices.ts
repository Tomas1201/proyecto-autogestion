
import { CareerModel, Career } from "../../Shared/Models/CareerModel.js"; // Tu modelo/interfaz Career
import { CareerSearchInterface } from "./CareerSearchInterface.js"; // Tu interfaz del repositorio
import { CareerSearchRepository } from "./CareerSearchRepository.js"; // Tu implementación del repositorio
import { FindOptions } from "sequelize"; // Para el método getAllCareers flexible

export interface ICareerSearchService {
  

  getCareersByName(Name: string): Promise<Career[] | null>;
}

export class CareerService implements ICareerSearchService {
  private CareerSearchRepository: CareerSearchInterface;

  // Inyección de dependencia del repositorio
  constructor(
    careerSearchRepository: CareerSearchInterface = new CareerSearchRepository()
  ) {
    this.CareerSearchRepository = careerSearchRepository;
  }

  public async getCareersByName(Name: string): Promise<Career[] | null> {
    console.log(`Servicio: Solicitando Careers por Name: '${Name}'`);
    try {
      
      const Careers = await this.CareerSearchRepository.findByName(Name);
      return Careers; 
    } catch (error) {
      console.error(
        `Servicio Error: Fallo al obtener Careers por Name '${Name}'.`,
        error
      );
      
      if (
        error instanceof Error &&
        error.message.includes("Parámetro de Name inválido")
      ) {
        throw error;
      }
      throw new Error(
        `No se pudieron recuperar las Careers por Name '${Name}' debido a un error.`
      );
    }
  }
}
