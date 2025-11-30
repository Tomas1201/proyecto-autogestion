
import { Student } from '../../../shared/models/student.model.js'; 

interface StudentCreationAttributes {
  name: string;
  lastName: string;
  email: string;
  status: string;
  dni: number;
  career?: string[]; 
}

export interface StudentInterface {
  FindAll(): Promise<Student[]>;

  FindById(id: string): Promise<Student | null>;
 

  


  Create(StudentData: StudentCreationAttributes): Promise<Student | null>; 

  Update(id: string, StudentData: Student): Promise<boolean>; 
  
}