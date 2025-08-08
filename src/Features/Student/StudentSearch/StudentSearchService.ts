import {Request, Response, NextFunction} from 'express';
import {StudentSearchRepository} from './StudentSearchRepository.js';

const StudentSearchRepositoryI = StudentSearchRepository.getInstance();

export const StudentSearchService = {



 getByName: async (name: string) => {
    try {
      const alumnos = await StudentSearchRepositoryI.FindByName(name);
      return alumnos;
    } catch (error) {
      console.error('Error fetching alumno by name:', error);
      throw new Error('Database error');
    }
  },


  getByLastName: async (apellido: string) => {
    try {
      const alumnos = await StudentSearchRepositoryI.FindByLastName(apellido);
      return alumnos;
    } catch (error) {
      console.error('Error fetching alumno by apellido:', error);
      throw new Error('Database error');}
    },
 
    getBySubject: async (asignatura: string) => {
      try{
        const alumnos = await StudentSearchRepositoryI.FindBySubject(asignatura);
        return alumnos;
      }catch (error){
        console.error('Error fetching alumno by apellido:', error);
      throw new Error('Database error');}
      
    },

 getByCareer: async (carrera: string) => {
      try{
        const alumnos = await StudentSearchRepositoryI.FindByCareer(carrera);
        return alumnos;
      }catch (error){
        console.error('Error fetching student by last name:', error);
      throw new Error('Database error');}
      
    },

}