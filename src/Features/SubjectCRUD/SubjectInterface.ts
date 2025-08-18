import { FindOptions } from 'sequelize';
import  type { Subject } from '../../Shared/Models/SubjectModel.js'; 

export interface SubjectInterface {
    
    FindAll(queryOptions?: FindOptions): Promise<Subject[]>;
     
      FindById(Id: string): Promise<Subject | null>;
    
    
      Create(SubjectData: Omit<Subject, 'Id'>): Promise<Subject>; 
    
      Update(Id: string, SubjectData: Subject): Promise<boolean>; 
  
  
}

