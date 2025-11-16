
import { Student } from '../../../shared/models/student.model.js'; // Asegúrate de que la ruta sea correcta

interface StudentCreationAttributes {
  name: string;
  lastName: string;
  email: string;
  status: "activo" | "inactivo" | "graduado";
  dni: number;
  career?: string[]; // opcional al crear
}

export interface StudentInterface {
  FindAll(): Promise<Student[]>;

  FindById(id: string): Promise<Student | null>;
 

  //findByCicloElectivo(cicloElectivoId: number): Promise<Student[] | null>; 


  Create(StudentData: StudentCreationAttributes): Promise<Student | null>; 

  Update(id: string, StudentData: Student): Promise<boolean>; 
  
}