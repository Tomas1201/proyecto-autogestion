import {Request, Response, NextFunction} from 'express';
import {StudentSearchRepository} from './StudentSearchRepository.js';

export class StudentSearchService {
  private static instance: StudentSearchService;
  private repository: StudentSearchRepository;

  private constructor() {
    this.repository = StudentSearchRepository.getInstance();
  }

  public static getInstance(): StudentSearchService {
    if (!StudentSearchService.instance) {
      StudentSearchService.instance = new StudentSearchService();
    }
    return StudentSearchService.instance;
  }

  public async getByName(name: string) {
    try {
      const alumnos = await this.repository.FindByName(name);
      return alumnos;
    } catch (error) {
      console.error('Error fetching alumno by name:', error);
      throw new Error('Database error');
    }
  }

  public async getByLastName(apellido: string) {
    try {
      const alumnos = await this.repository.FindByLastName(apellido);
      return alumnos;
    } catch (error) {
      console.error('Error fetching alumno by apellido:', error);
      throw new Error('Database error');
    }
  }

  public async getBySubject(asignatura: string) {
    try {
      const alumnos = await this.repository.FindBySubject(asignatura);
      return alumnos;
    } catch (error) {
      console.error('Error fetching alumno by asignatura:', error);
      throw new Error('Database error');
    }
  }

  public async getByCareer(carrera: string) {
    try {
      const alumnos = await this.repository.FindByCareer(carrera);
      return alumnos;
    } catch (error) {
      console.error('Error fetching student by career:', error);
      throw new Error('Database error');
    }
  }
}