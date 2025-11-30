import { Student } from '../../../shared/models/student.model.js'; 

export interface StudentInterface {
  
  FindByName(Name: string): Promise<Student[] | null>;

  FindByLastName(LastName: string): Promise<Student[] | null>;

  FindByCareer(Career: string): Promise<Student[] | null>; 

  FindBySubject(Subject: string): Promise<Student[] | null>; 

  FindByFile(File: number): Promise<Student | null>;

  FindByDni(Dni: number): Promise<Student | null>; 

  FindByEmail(Email: string): Promise<Student | null>;

  

  FindByStatus(Status: string): Promise<Student[] | null>;
  
}


