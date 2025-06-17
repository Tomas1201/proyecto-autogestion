
import { CarreraInterface } from './Carrera.interface';
import  { Carrera, CarreraModel } from './CarreraModel'; // Asegúrate de que la ruta sea correcta
import { Op } from 'sequelize';

export class CarreraRepository implements CarreraInterface {
    // Aquí irían las implementaciones de los métodos definidos en CarreraInterface
    // Implementación para obtener todas las carreras
    async findAll(): Promise<Carrera[]> {
         try {
            const carreras = await CarreraModel.findAll();
            return carreras ? carreras as Carrera[] : [];
        } catch (error) {
            console.error('Error fetching all Carreras:', error);
            throw new Error('Database error');
        }      
       
    }
    
    async findById(id: number): Promise<Carrera | null> {
        try {
            const alumno = await CarreraModel.findByPk(id);
            return alumno ? alumno as Carrera : null;
        } catch (error) {
            console.error('Error fetching de la carrera por ID:', error);
            throw new Error('Database error');
        }
    }
    
    async findByName(name: string): Promise<Carrera[] | null> {
        try {
            if (!name || typeof name !== 'string') {
                throw new Error('Invalid name parameter');
            }
            const query = {
                where: {
                    nombre: {
                        [Op.like]: `%${name.toLowerCase()}%`
                    }
                }
            };
            
            const carreras = await CarreraModel.findAll(query);
                    
            return carreras ? carreras as Carrera[] : null;
        } catch (error) {
            console.error('Error en la busqueda de la Carrera por Nombre:', error);
            throw error;
        }
    }
    
    async create(carreraData: Omit<Carrera, 'id'>): Promise<Carrera> {
        // Implementación para crear una nueva carrera
        throw new Error('Method not implemented.');
    }
    
    async update(id: number, carreraData: Partial<Carrera>): Promise<boolean> {
        // Implementación para actualizar una carrera existente
        throw new Error('Method not implemented.');
    }
}