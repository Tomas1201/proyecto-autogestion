
import { Student } from '../../../Shared/Models/StudentModel.js'; // Asegúrate de que la ruta sea correcta

export interface StudentInterface {
  FindAll(): Promise<Student[]>;

  FindById(id: string): Promise<Student | null>;
 

  //findByCicloElectivo(cicloElectivoId: number): Promise<Student[] | null>; 


  Create(StudentData: Student): Promise<Student | null>; 

  Update(id: number, StudentData: Student): Promise<boolean>; 
  
}