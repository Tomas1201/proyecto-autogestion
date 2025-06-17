import type { Asignatura } from './Asignatura.Model'; // Asegúrate de que la ruta sea correcta

export interface CarreraInterface {
  findAll(): Promise<Carrera[]>;

  findById(id: number): Promise<Carrera | null>;

  findByName(name: string): Promise<Carrera[] | null>;

  
/*
  findByEmail(email: string): Promise<Alumno | null>;

  findByLegajo(legajo: number): Promise<Alumno | null>;

  findByCarrera(carreraId: number): Promise<Alumno[] | null>; 

  findByCicloElectivo(cicloElectivoId: number): Promise<Alumno[] | null>; 

  findByDni(dni: string): Promise<Alumno | null>; 
  
  findByAsignatura(AsignaturaId: number): Promise<Alumno[] | null>; 
*/
  create(alumnoData: Omit<Carrera, 'id'>): Promise<Carrera>; 

  update(id: number, alumnoData: Partial<Carrera>): Promise<boolean>; 
  
}

