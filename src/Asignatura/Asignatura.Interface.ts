import type { Asignatura } from './Asignatura.Model'; // Asegúrate de que la ruta sea correcta

export interface AsignaturaInterface {
  findAll(): Promise<Asignatura[]>;

  findById(id: number): Promise<Asignatura | null>;

  findByName(name: string): Promise<Asignatura[] | null>;

  
/*
  findByEmail(email: string): Promise<Alumno | null>;

  findByLegajo(legajo: number): Promise<Alumno | null>;

  findByCarrera(carreraId: number): Promise<Alumno[] | null>; 

  findByCicloElectivo(cicloElectivoId: number): Promise<Alumno[] | null>; 

  findByDni(dni: string): Promise<Alumno | null>; 
  
  findByAsignatura(AsignaturaId: number): Promise<Alumno[] | null>; 
*/
  create(alumnoData: Omit<Asignatura, 'id'>): Promise<Asignatura>; 

  update(id: number, alumnoData: Partial<Asignatura>): Promise<boolean>; 
  
}

