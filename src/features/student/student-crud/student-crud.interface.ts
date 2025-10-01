
import { Student } from '../../../shared/models/student.model.js'; // Asegúrate de que la ruta sea correcta

export interface StudentInterface {
  FindAll(): Promise<Student[]>;

  FindById(id: string): Promise<Student | null>;
 

  //findByCicloElectivo(cicloElectivoId: number): Promise<Student[] | null>; 


  Create(StudentData: Student): Promise<Student | null>; 

  Update(id: string, StudentData: Student): Promise<boolean>; 
  
}