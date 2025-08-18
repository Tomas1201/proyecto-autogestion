
import { SubjectInterface } from './SubjectInterface.js';
import  { Subject, SubjectModel } from '../../Shared/Models/SubjectModel'; 
import { Op } from 'sequelize';

export class SubjectRepository implements SubjectInterface {
    
    async FindAll(): Promise<Subject[]> {
         try {
            const Subject = await SubjectModel.findAll();
            return Subject ? Subject as Subject[] : [];
        } catch (error) {
            console.error('Error to Feetching Subject:', error);
            throw new Error('Database error');
        }      
       
    }

   
    
    async FindById(Id: string): Promise<Subject | null> {
        try {
            const Subject = await SubjectModel.findByPk(Id);
            return Subject ? Subject as Subject : null;
        } catch (error) {
            console.error('Error to find Subject by ID:', error);
            throw new Error('Database error');
        }
    }
    
    
    
    async Create(SubjectData: Omit<Subject, 'Id'>): Promise<Subject> {
        try {
                    
            const IfExist = await SubjectModel.findOne({ where: { Name: SubjectData.Name } });
        
                    if (IfExist) {
                        
                        throw new Error(`The Subject with  name '${SubjectData.Name}' already exists.`);
                    }
        
                    
                    const NewSubject = await SubjectModel.create(SubjectData);
                    return NewSubject as Subject;
        
                } catch (error) {
                    console.error('Error creating Subject:', error);
                    
                    throw error;
                }
    }
    
    async Update(Id: string, SubjectData: Partial<Subject>): Promise<boolean> {
          try {
                        const [RowsUpdated] = await SubjectModel.update(SubjectData, {
                         where: { Id },
                   });
        
                   return RowsUpdated > 0;
                   } catch (error) {
                     console.error(`Error updating Subject with ID ${Id}:`, error);
                     throw new Error('Error updating the Subject');
                    }
    }
}