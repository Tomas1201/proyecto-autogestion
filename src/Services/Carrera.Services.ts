// src/services/CarreraService.ts

import { CarreraModel, Carrera} from '../Models/Entities/CarreraModel.js'; // Tu modelo/interfaz Carrera
import { CarreraInterface } from '../Repositories/Carrera.interface.js'; // Tu interfaz del repositorio
import { CarreraRepository } from '../Repositories/Carrera.repository.js'; // Tu implementación del repositorio
import { FindOptions } from 'sequelize'; // Para el método getAllCarreras flexible


export interface ICarreraService {//Opcional
    getAllCarreras(): Promise<Carrera[]>;
    getCarreraById(id: number): Promise<Carrera | null>;
    getCarrerasByName(name: string): Promise<Carrera[] | null>;
    createCarrera(carreraData: Omit<Carrera, 'id'>): Promise<Carrera>;
    updateCarrera(id: number, carreraData: Partial<Carrera>): Promise<boolean>;
    deleteCarrera(id: number): Promise<boolean>;
}

export class CarreraService implements ICarreraService {
    private carreraRepository: CarreraInterface;

    // Inyección de dependencia del repositorio
    constructor(carreraRepository: CarreraInterface = new CarreraRepository()) {
        this.carreraRepository = carreraRepository;
    }

    public async getAllCarreras(): Promise<Carrera[]> {
        console.log("Servicio: Solicitando todas las carreras con opciones:", );
        try {
            // Lógica de negocio si la hay (ej. validaciones de permiso de alto nivel)
            const carreras = await this.carreraRepository.findAll();
            return carreras; // El repositorio ya maneja si es [] o datos
        } catch (error) {
            console.error('Servicio Error: Fallo al obtener todas las Carreras.', error);
            // Re-lanzar un error más amigable para el controlador
            throw new Error('No se pudieron recuperar las carreras debido a un error interno.');
        }
    }

    public async getCarreraById(id: number): Promise<Carrera | null> {
        console.log(`Servicio: Solicitando carrera por ID: ${id}`);
        try {
            if (id <= 0) {
                throw new Error('ID de carrera inválido.');
            }
            const carrera = await this.carreraRepository.findById(id);
            return carrera;
        } catch (error) {
            console.error(`Servicio Error: Fallo al obtener la Carrera con ID ${id}.`, error);
            throw new Error(`No se pudo recuperar la carrera con ID ${id} debido a un error.`);
        }
    }

    public async getCarrerasByName(name: string): Promise<Carrera[] | null> {
        console.log(`Servicio: Solicitando carreras por nombre: '${name}'`);
        try {
            // La validación del parámetro 'name' ya se hace en el repositorio, pero podrías tener validaciones adicionales aquí.
            const carreras = await this.carreraRepository.findByName(name);
            return carreras; // El repositorio ya devuelve [] o null
        } catch (error) {
            console.error(`Servicio Error: Fallo al obtener Carreras por nombre '${name}'.`, error);
            // Capturar errores específicos del repositorio (ej. "Parámetro de nombre inválido")
            if (error instanceof Error && error.message.includes('Parámetro de nombre inválido')) {
                throw error; // Re-lanzar el error de validación específico
            }
            throw new Error(`No se pudieron recuperar las carreras por nombre '${name}' debido a un error.`);
        }
    }

    public async createCarrera(carreraData: Omit<Carrera, 'id'>): Promise<Carrera> {
        console.log("Servicio: Intentando crear Carrera:", carreraData.nombre);
        // Validaciones de negocio antes de llamar al repositorio
        if (!carreraData.nombre || carreraData.nombre.trim() === '') {
            throw new Error('El nombre de la carrera es obligatorio.');
        }
        if (carreraData.cant_alumno <= 0) {
            throw new Error('La cantidad de alumnos debe ser un número positivo.');
        }

        //Ver donde imlementar la siguiente validacion:  const existingCarrera = await this.carreraRepository.findByName(carreraData.nombre);
        /*
        // Si la búsqueda devuelve resultados, significa que ya existe
        if (existingCarrera.length > 0) {
            throw new Error('Ya existe una carrera con ese nombre');
        }*/

        try {
            const newCarrera = await this.carreraRepository.create(carreraData);
            return newCarrera;
        } catch (error: any) { // Puedes tipar 'error' de forma más específica si es necesario
            console.error('Servicio Error: Fallo al crear Carrera.', error);
            // Capturar errores específicos del repositorio (ej. "La Carrera ya existe")
            if (error instanceof Error && error.message.includes('ya existe')) {
                throw error; // Re-lanzar el error de negocio específico
            }
            throw new Error('No se pudo crear la carrera debido a un error interno.');
        }
    }

    public async updateCarrera(id: number, carreraData: Partial<Carrera>): Promise<boolean> {
        console.log(`Servicio: Intentando actualizar Carrera con ID ${id}`);
        // Validaciones de negocio antes de llamar al repositorio
        if (id <= 0) {
            throw new Error('ID de carrera inválido para la actualización.');
        }
        if (Object.keys(carreraData).length === 0) {
            throw new Error('No se proporcionaron datos para actualizar.');
        }
        // Puedes añadir más validaciones para los datos en carreraData

        try {
            // Opcional: Verificar si la carrera existe antes de intentar actualizar
            // const existing = await this.carreraRepository.findById(id);
            // if (!existing) {
            //     throw new Error(`La carrera con ID ${id} no existe.`);
            // }

            const success = await this.carreraRepository.update(id, carreraData);
            if (!success) {
                // Si la actualización no afectó ninguna fila, podría significar que el ID no existe
                const exists = await this.carreraRepository.findById(id);
                if (!exists) {
                    throw new Error(`La carrera con ID ${id} no fue encontrada para actualizar.`);
                }
                throw new Error(`No se pudo actualizar la carrera con ID ${id}.`);
            }
            return success;
        } catch (error) {
            console.error(`Servicio Error: Fallo al actualizar Carrera con ID ${id}.`, error);
            throw error; // Re-lanza cualquier error específico
        }
    }

    public async deleteCarrera(id: number): Promise<boolean> {
        console.log(`Servicio: Intentando eliminar Carrera con ID ${id}`);
        try {
            if (id <= 0) {
                throw new Error('ID de carrera inválido para la eliminación.');
            }
            // Opcional: Verificar si la carrera existe antes de intentar eliminar
            const exists = await this.carreraRepository.findById(id);
            if (!exists) {
                throw new Error(`La carrera con ID ${id} no existe para eliminar.`);
            }

            const success = await this.carreraRepository.delete(id);
            if (!success) {
                throw new Error(`No se pudo eliminar la carrera con ID ${id}.`);
            }
            return success;
        } catch (error) {
            console.error(`Servicio Error: Fallo al eliminar Carrera con ID ${id}.`, error);
            throw error;
        }
    }
}