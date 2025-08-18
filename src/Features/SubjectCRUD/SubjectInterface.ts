import { FindOptions } from 'sequelize';
import  type { Subject } from '../../Shared/Models/SubjectModel.js'; // Asegúrate de que la ruta sea correcta

export interface ISubjectRepository {
    // Busca todas las materias en la base de datos
    findAll(queryOptions?: FindOptions): Promise<Subject[]>;
     
      findById(Id: string): Promise<Subject | null>;
    
      findByName(name: string): Promise<Subject[] | null>;
    
      create(SubjectData: Omit<Subject, 'id'>): Promise<Subject>; 
    
      update(Id: string, SubjectData: Subject): Promise<boolean>; 
  
  
}

