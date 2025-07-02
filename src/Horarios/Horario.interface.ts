import type { Horarios } from './Horario.Model.ts'; 
import type { Carrera } from '../Carrera/CarreraModel.ts';
import type { Asignatura } from '../Asignatura/Asignatura.Model.ts'; 
export interface HorariosInterface {
  findAll(): Promise<Horarios[]>;

  findById(id: number): Promise<Horarios | null>;

 findByCareer(carreras: Carrera[]): Promise<Horarios[]>;

 findByAsignature(asignaturas: Asignatura[]): Promise<Horarios[]>

  

  create(carreras: Carrera[],asignaturas: Asignatura[],carreraData: Omit<Horarios, 'id'>): Promise<Horarios>; 

  update(carreras: Carrera[],asignaturas: Asignatura[],id: number, carreraData: Partial<Horarios>): Promise<boolean>; 
  
}

