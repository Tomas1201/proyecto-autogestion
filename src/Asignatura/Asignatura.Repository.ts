
import { AsignaturaInterface } from './Asignatura.interface';
import  { Asignatura, AsignaturaModel } from './Asignatura.Model'; // Asegúrate de que la ruta sea correcta
import { Op } from 'sequelize';

export class AsignaturaRepository implements AsignaturaInterface {
    // Aquí irían las implementaciones de los métodos definidos en CarreraInterface
    // Implementación para obtener todas las carreras
    async findAll(): Promise<Asignatura[]> {
         try {
            const asignatura = await AsignaturaModel.findAll();
            return asignatura ? asignatura as Asignatura[] : [];
        } catch (error) {
            console.error('Error al traer las asignaturas:', error);
            throw new Error('Database error');
        }      
       
    }
    
    async findById(id: number): Promise<Asignatura | null> {
        try {
            const asignatura = await AsignaturaModel.findByPk(id);
            return asignatura ? asignatura as Asignatura : null;
        } catch (error) {
            console.error('Error al encotrar la Asignatura por ID:', error);
            throw new Error('Database error');
        }
    }
    
    async findByName(name: string): Promise<Asignatura[] | null> {
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
            
            const asignatura = await AsignaturaModel.findAll(query);
                    
            return asignatura ? asignatura as Asignatura[] : null;
        } catch (error) {
            console.error('Error en la busqueda de la Carrera por Nombre:', error);
            throw error;
        }
    }
    
    async create(asignaturaData: Omit<Asignatura, 'id'>): Promise<Asignatura> {
        // Implementación para crear una nueva carrera
        throw new Error('Method not implemented.');
    }
    
    async update(id: number, asignaturaData: Partial<Asignatura>): Promise<boolean> {
        // Implementación para actualizar una carrera existente
        throw new Error('Method not implemented.');
    }
}