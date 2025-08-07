/*import type { Horarios } from './Horario.Model.js'; 
import type { Career } from '../Career/CareerModel.js';
import type { Subject } from '../Subject/Subject.Model.js'; 
export interface HorariosInterface {
  findAll(): Promise<Horarios[]>;

  findById(id: number): Promise<Horarios | null>;

 findByCareer(Careers: Career[]): Promise<Horarios[]>;

 findByAsignature(Subjects: Subject[]): Promise<Horarios[]>

  

  create(Careers: Career[],Subjects: Subject[],CareerData: Omit<Horarios, 'id'>): Promise<Horarios>; 

  update(Careers: Career[],Subjects: Subject[],id: number, CareerData: Partial<Horarios>): Promise<boolean>; 
  
}

*/