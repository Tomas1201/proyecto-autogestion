/*
import { SubjectInterface } from './Subject.Interface';
import  { Subject, SubjectModel } from './Subject.Model'; // Asegúrate de que la ruta sea correcta
import { Op } from 'sequelize';

export class SubjectRepository implements SubjectInterface {
    // Aquí irían las implementaciones de los métodos definidos en CareerInterface
    // Implementación para obtener todas las Careers
    async findAll(): Promise<Subject[]> {
         try {
            const Subject = await SubjectModel.findAll();
            return Subject ? Subject as Subject[] : [];
        } catch (error) {
            console.error('Error al traer las Subjects:', error);
            throw new Error('Database error');
        }      
       
    }

   
    
    async findById(id: number): Promise<Subject | null> {
        try {
            const Subject = await SubjectModel.findByPk(id);
            return Subject ? Subject as Subject : null;
        } catch (error) {
            console.error('Error al encotrar la Subject por ID:', error);
            throw new Error('Database error');
        }
    }
    
    async findByName(name: string): Promise<Subject[] | null> {
        try {
            if (!name || typeof name !== 'string') {
                throw new Error('Invalid name parameter');
            }
            const query = {
                where: {
                    name: {
                        [Op.like]: `%${name.toLowerCase()}%`
                    }
                }
            };
            
            const Subject = await SubjectModel.findAll(query);
                    
            return Subject ? Subject as Subject[] : null;
        } catch (error) {
            console.error('Error en la busqueda de la Career por name:', error);
            throw error;
        }
    }
    
    async create(SubjectData: Omit<Subject, 'id'>): Promise<Subject> {
        // Implementación para crear una nueva Career
        throw new Error('Method not implemented.');
    }
    
    async update(id: number, SubjectData: Partial<Subject>): Promise<boolean> {
        // Implementación para actualizar una Career existente
        throw new Error('Method not implemented.');
    }
}*/