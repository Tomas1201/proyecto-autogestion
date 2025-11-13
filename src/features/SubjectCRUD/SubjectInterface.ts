import { FindOptions } from 'sequelize';
import  type { Subject } from '../../shared/models/subject.model.js'; 

export interface SubjectInterface {
    
    findAll(queryOptions?: FindOptions): Promise<Subject[]>;
     
      findById(Id: string): Promise<Subject | null>;
    
    
      create(SubjectData: Omit<Subject, 'Id'>): Promise<Subject>; 
    
      update(id: string, SubjectData: Subject): Promise<boolean>; 
  
  
}

