import { Professor } from './ProfessorModel';

export interface ProfessorInterface {
  findAll(): Promise<Professor[]>;
  findById(id: number): Promise<Professor | null>;
  findByName(name: string): Promise<Professor[] | null>;
  findByApellido(apellido: string): Promise<Professor[] | null>;
  findByEmail(email: string): Promise<Professor | null>;
  findByLegajo(legajo: number): Promise<Professor | null>;
  findByDni(dni: string): Promise<Professor | null>;
  create(professorData: Omit<Professor, 'id'>): Promise<Professor>; 
  update(id: number, professorData: Partial<Professor>): Promise<boolean>;
  archive(id: number): Promise<boolean>;
}