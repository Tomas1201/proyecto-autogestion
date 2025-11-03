import { FindOptions } from 'sequelize';
import  type { Subject } from '../../Shared/Models/subject.model.js'; 

export interface SubjectInterface {
    
    findAll(queryOptions?: FindOptions): Promise<Subject[]>;
     
      findById(Id: string): Promise<Subject | null>;
    
    
      create(SubjectData: Omit<Subject, 'Id'>): Promise<Subject>; 
    
      update(id: string, SubjectData: Subject): Promise<boolean>; 
  
  
}

