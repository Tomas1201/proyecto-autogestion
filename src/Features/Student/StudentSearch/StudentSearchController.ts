import express from 'express';
import { Request, Response, NextFunction } from "express";
import {StudentSearchService} from './StudentSearchService.js';
 
export const StudentSearchController = {

 getStudentsByName: async (req: Request, res: Response) => {
    const { name } = req.params;

    try {
      const Students = await StudentSearchService.getByName(name);

      if (!Students || Students.length === 0) {
        res
          .status(404)
          .json({ status: 404, message: "No alumnos found with that name" });
        return;
      }
      res.status(200).json({ status: 200, data: Students });
      return;
    } catch (error) {
      console.error("Error fetching alumno by name:", error);
      res.status(500).json({ status: 500, message: "Internal server error" });
      return;
    }
  },

  getStudentsByLastName: async (req: Request, res: Response) => {
    const { LastName } = req.params;

    try {
      const Students = await StudentSearchService.getByLastName(LastName);

      if (!Students || Students.length === 0) {
        res
          .status(404)
          .json({
            status: 404,
            message: "No alumnos found with that apellido",
          });
        return;
      }
      res.status(200).json({ status: 200, data: Students });
      return;
    } catch (error) {
      console.error("Error fetching student by last name:", error);
      res.status(500).json({ status: 500, message: "Internal server error" });
      return;
    }
  },

  getBySubject: async (req: Request, res: Response) => {
    const { asignatura } = req.params;
    try {
      const alumnos = await StudentSearchService.getBySubject(asignatura);
      if (!alumnos || alumnos.length === 0) {
        res
          .status(404)
          .json({
            status: 404,
            message: "No alumnos found with that apellido",
          });
        return;
      }
      res.status(200).json({ status: 200, data: alumnos });
      return;
    } catch (error) {
      console.error("Error fetching alumno by apellido:", error);
      res.status(500).json({ status: 500, message: "Internal server error" });
      return;
    }
  },

  getByCareer: async (req: Request, res: Response) => {
    const { carrera } = req.params;
    try {
      const alumnos = await StudentSearchService.getByCareer(carrera);
      if (!alumnos || alumnos.length === 0) {
        res
          .status(404)
          .json({
            status: 404,
            message: "No alumnos found with that apellido",
          });
        return;
      }
      res.status(200).json({ status: 200, data: alumnos });
      return;
    } catch (error) {
      console.error("Error fetching alumno by apellido:", error);
      res.status(500).json({ status: 500, message: "Internal server error" });
      return;
    }
  },


}