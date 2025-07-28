
import { Alumno } from '../Models/AlumnoModel'; // Asegúrate de que la ruta sea correcta

export interface AlumnoInterface {
  findAll(): Promise<Alumno[]>;

  findById(id: number): Promise<Alumno | null>;

  findByName(name: string): Promise<Alumno[] | null>;

  findByApellido(apellido: string): Promise<Alumno[] | null>;

  findByCarrera(carrera: string): Promise<Alumno[] | null>; 

  findByAsignatura(Asignatura: string): Promise<Alumno[] | null>; 

  findByLegajo(legajo: number): Promise<Alumno | null>;

  findByDni(dni: number): Promise<Alumno | null>; 

  findByEmail(email: string): Promise<Alumno | null>;

  //findByCicloElectivo(cicloElectivoId: number): Promise<Alumno[] | null>; 

  findByStatus(status: string): Promise<Alumno[] | null>;

  

  create(alumnoData: Alumno): Promise<Alumno | null>; 

  update(id: number, alumnoData: Partial<Alumno>): Promise<boolean>; 
  
}