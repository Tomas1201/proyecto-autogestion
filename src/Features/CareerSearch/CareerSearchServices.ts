// src/services/CareerService.ts

import { CareerModel, Career } from "../../Shared/Models/CareerModel.js"; 
import { CareerSearchInterface } from "./CareerSearchInterface.js"; 
import { CareerSearchRepository } from "./CareerSearchRepository.js"; 
import { FindOptions } from "sequelize"; 

export interface ICareerSearchService {
 

  getCareersByName(name: string): Promise<Career[] | null>;
}

export class CareerService implements ICareerSearchService {
  private CareerSearchRepository: CareerSearchInterface;

  
  constructor(
    careerSearchRepository: CareerSearchInterface = new CareerSearchRepository()
  ) {
    this.CareerSearchRepository = careerSearchRepository;
  }

  public async getCareersByName(name: string): Promise<Career[] | null> {
    console.log(`Servicio: Solicitando Careers por name: '${name}'`);
    try {
      
      const Careers = await this.CareerSearchRepository.findByName(name);
      return Careers; 
    } catch (error) {
      console.error(
        `Servicio Error: Fallo al obtener Careers por name '${name}'.`,
        error
      );
      
      if (
        error instanceof Error &&
        error.message.includes("Parámetro de name inválido")
      ) {
        throw error; 
      }
      throw new Error(
        `No se pudieron recuperar las Careers por name '${name}' debido a un error.`
      );
    }
  }
}
