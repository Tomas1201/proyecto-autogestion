// src/services/CareerService.ts

import { CareerModel, Career} from '../../Shared/Models/CareerModel.js'; // Tu modelo/interfaz Career
import { CareerInterface } from './CareerInterface.js'; // Tu interfaz del repositorio
import { CareerRepository } from './CareerRepository.js'; // Tu implementación del repositorio
import { FindOptions } from 'sequelize'; // Para el método getAllCareers flexible


export interface ICareerService {//Opcional
    getAllCareers(): Promise<Career[]>;
    getCareerById(id: number): Promise<Career | null>;
    getCareersByName(name: string): Promise<Career[] | null>;
    createCareer(CareerData: Career): Promise<Career>;
    UpdateCareer(id: number, CareerData: Partial<Career>): Promise<boolean>;
   
}

export class CareerService implements ICareerService {
    private CareerRepository: CareerInterface;

    // Inyección de dependencia del repositorio
    constructor(careerRepository: CareerInterface = new CareerRepository()) {
        this.CareerRepository = careerRepository;
    }

    public async getAllCareers(): Promise<Career[]> {
        
        try {
            // Lógica de negocio si la hay (ej. validaciones de permiso de alto nivel)
            const Careers = await this.CareerRepository.findAll();
            return Careers; // El repositorio ya maneja si es [] o datos
        } catch (error) {
            console.error('Service Error: Failed to get all Careers.', error);
            // Re-lanzar un error más amigable para el controlador
            throw new Error('Careers could not be retrieved due to an internal error.');
        }
    }

    public async getCareerById(id: number): Promise<Career | null> {
        console.log(`Servicio: Solicitando Career por ID: ${id}`);
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
            // La validación del parámetro 'name' ya se hace en el repositorio, pero podrías tener validaciones adicionales aquí.
            const Careers = await this.CareerRepository.findByName(name);
            return Careers; // El repositorio ya devuelve [] o null
        } catch (error) {
            console.error(`Servicio Error: Fallo al obtener Careers por name '${name}'.`, error);
            // Capturar errores específicos del repositorio (ej. "Parámetro de name inválido")
            if (error instanceof Error && error.message.includes('Parámetro de name inválido')) {
                throw error; // Re-lanzar el error de validación específico
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
        } catch (error: any) { // Puedes tipar 'error' de forma más específica si es necesario
            console.error('Servicio Error: Fallo al crear Career.', error);
            // Capturar errores específicos del repositorio (ej. "La Career ya existe")
            
            throw new Error('The Career could not be created due to an internal error.');
        }
    }

    public async UpdateCareer(id: number, CareerData: Partial<Career>): Promise<boolean> {
        
        // Validaciones de negocio antes de llamar al repositorio
        if (id <= 0) {
            throw new Error('Invalid Career ID for update.');
        }
        if (Object.keys(CareerData).length === 0) {
            throw new Error('No data was provided to update.');
        }
        // Puedes añadir más validaciones para los datos en CareerData

        try {
            // Opcional: Verificar si la Career existe antes de intentar actualizar
            // const existing = await this.CareerRepository.findById(id);
            // if (!existing) {
            //     throw new Error(`La Career con ID ${id} no existe.`);
            // }

            const success = await this.CareerRepository.update(id, CareerData);
            if (!success) {
                // Si la actualización no afectó ninguna fila, podría significar que el ID no existe
                const exists = await this.CareerRepository.findById(id);
                if (!exists) {
                    throw new Error(`The Career with ID  ${id} was not found to update..`);
                }
                throw new Error(`Could not update Career with ID${id}.`);
            }
            return success;
        } catch (error) {
            console.error(`Service Error: Failed to update Career with ID${id}.`, error);
            throw error; // Re-lanza cualquier error específico
        }
    }

   
}