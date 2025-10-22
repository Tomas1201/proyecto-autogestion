// src/services/CareerService.ts

import { CareerModel, Career } from '../../../shared/models/career.model.js';; 
import { CareerSearchInterface } from "./career-search.interface.js"; 
import { CareerSearchRepository } from "./career-search.repository.js"; 
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
      
      const careers = await this.CareerSearchRepository.findByName(name);
      return careers; 
    } catch (error) {
      console.error(
        `Service Error: Failed to get Careers by name '${name}'.`,
        error
      );
      
      if (
        error instanceof Error &&
        error.message.includes("Invalid name parameter")
      ) {
        throw error; 
      }
      throw new Error(
        `Careers could not be retrieved by name '${name}' due to an error.`
      );
    }
  }
}
