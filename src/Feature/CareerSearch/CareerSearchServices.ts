// src/services/CareerService.ts

import { CareerModel, Career } from "../../Shared/Models/CareerModel.js"; // Tu modelo/interfaz Career
import { CareerSearchInterface } from "./CareerSearchInterface.js"; // Tu interfaz del repositorio
import { CareerSearchRepository } from "./CareerSearchRepository.js"; // Tu implementación del repositorio
import { FindOptions } from "sequelize"; // Para el método getAllCareers flexible

export interface ICareerSearchService {
  //Opcional

  getCareersByName(name: string): Promise<Career[] | null>;
}

export class CareerService implements ICareerSearchService {
  private CareerSearchRepository: CareerSearchInterface;

  // Inyección de dependencia del repositorio
  constructor(
    careerSearchRepository: CareerSearchInterface = new CareerSearchRepository()
  ) {
    this.CareerSearchRepository = careerSearchRepository;
  }

  public async getCareersByName(name: string): Promise<Career[] | null> {
    console.log(`Servicio: Solicitando Careers por name: '${name}'`);
    try {
      // La validación del parámetro 'name' ya se hace en el repositorio, pero podrías tener validaciones adicionales aquí.
      const Careers = await this.CareerSearchRepository.findByName(name);
      return Careers; // El repositorio ya devuelve [] o null
    } catch (error) {
      console.error(
        `Servicio Error: Fallo al obtener Careers por name '${name}'.`,
        error
      );
      // Capturar errores específicos del repositorio (ej. "Parámetro de name inválido")
      if (
        error instanceof Error &&
        error.message.includes("Parámetro de name inválido")
      ) {
        throw error; // Re-lanzar el error de validación específico
      }
      throw new Error(
        `No se pudieron recuperar las Careers por name '${name}' debido a un error.`
      );
    }
  }
}
