
import { SubjectInterface } from './SubjectInterface.js';
import  { Subject, SubjectModel } from '../../Shared/Models/subject.model.js'; 
import { Op } from 'sequelize';

export class SubjectRepository implements SubjectInterface {
    
    async findAll(): Promise<Subject[]> {
         try {
            const Subject = await SubjectModel.findAll();
            return Subject ? Subject as Subject[] : [];
        } catch (error) {
            console.error('Error to Feetching Subject:', error);
            throw new Error('Database error');
        }      
       
    }

   
    
    async findById(id: string): Promise<Subject | null> {
        try {
            const Subject = await SubjectModel.findByPk(id);
            return Subject ? Subject as Subject : null;
        } catch (error) {
            console.error('Error to find Subject by ID:', error);
            throw new Error('Database error');
        }
    }
    
    
    
    async create(SubjectData: Omit<Subject, 'Id'> & { name: string }): Promise<Subject> {
        try {
                    
            const IfExist = await SubjectModel.findOne({ where: { name: SubjectData.name } });
        
                    if (IfExist) {
                        
                        throw new Error(`The Subject with  name '${SubjectData.name}' already exists.`);
                    }
        
                    
                    const NewSubject = await SubjectModel.create(SubjectData as any);
                    return NewSubject as Subject;
        
                } catch (error) {
                    console.error('Error creating Subject:', error);
                    
                    throw error;
                }
    }
    
    async update(id: string, SubjectData: Partial<Subject>): Promise<boolean> {
          try {
                        const [RowsUpdated] = await SubjectModel.update(SubjectData, {
                         where: { id },
                   });
        
                   return RowsUpdated > 0;
                   } catch (error) {
                     console.error(`Error updating Subject with ID ${id}:`, error);
                     throw new Error('Error updating the Subject');
                    }
    }
}