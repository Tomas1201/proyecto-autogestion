import type { Subject } from '../../Shared/Models/SubjectModel.js'; 

export interface SubjectSearchInterface {
  

  FindByName(Name: string): Promise<Subject[] | null>;

  
}