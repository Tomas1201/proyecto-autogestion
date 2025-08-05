
import { Student } from '../../../Models/Entities/StudentModel.js'; // Asegúrate de que la ruta sea correcta

export interface StudentInterface {
  FindAll(): Promise<Student[]>;

  FindById(Id: number): Promise<Student | null>;

  FindByName(Name: string): Promise<Student[] | null>;

  FindByLastName(LastName: string): Promise<Student[] | null>;

  FindByCareer(Career: string): Promise<Student[] | null>; 

  FindBySubject(Subject: string): Promise<Student[] | null>; 

  FindByFile(File: number): Promise<Student | null>;

  FindByDni(Dni: number): Promise<Student | null>; 

  FindByEmail(Email: string): Promise<Student | null>;

  //findByCicloElectivo(cicloElectivoId: number): Promise<Student[] | null>; 

  FindByStatus(Status: string): Promise<Student[] | null>;


  Create(StudentData: Student): Promise<Student | null>; 

  Update(id: number, StudentData: Student): Promise<boolean>; 
  
}