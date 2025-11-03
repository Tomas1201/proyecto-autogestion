import type { Subject } from '../../Shared/Models/subject.model.js'; 

export interface SubjectSearchInterface {
  

  FindByName(Name: string): Promise<Subject[] | null>;

  
}