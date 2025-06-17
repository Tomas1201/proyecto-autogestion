import type { Carrera } from './CarreraModel.js'; // Asegúrate de que la ruta sea correcta

export interface CarreraInterface {
  findAll(): Promise<Carrera[]>;

  findById(id: number): Promise<Carrera | null>;

  findByName(name: string): Promise<Carrera[] | null>;

  

  create(alumnoData: Omit<Carrera, 'id'>): Promise<Carrera>; 

  update(id: number, alumnoData: Partial<Carrera>): Promise<boolean>; 
  
}

