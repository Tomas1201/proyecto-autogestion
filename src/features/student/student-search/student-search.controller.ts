import express from 'express';
import { Request, Response, NextFunction } from "express";
import {StudentSearchService} from './student-search.service.js';
 
export const StudentSearchController = {

 getStudentsByName: async (req: Request, res: Response) => {
    const { Name } = req.params;

    try {
      const Students = await StudentSearchService.getByName(Name);

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
    const { Subject } = req.params;
    try {
      const alumnos = await StudentSearchService.getBySubject(Subject);
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
    const { Career } = req.params;
    try {
      const alumnos = await StudentSearchService.getByCareer(Career);
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

  getByDni: async (req: Request, res: Response) => {
    const Dni = Number(req.params.Dni);
    try {
      const alumnos = await StudentSearchService.getByDni(Dni);
      if (!alumnos) {
        res
          .status(404)
          .json({
            status: 404,
            message: "No alumnos found with that DNI",
          });
        return;
      }
      res.status(200).json({ status: 200, data: alumnos });
      return;
    } catch (error) {
      console.error("Error fetching alumno by DNI:", error);
      res.status(500).json({ status: 500, message: "Internal server error" });
      return;
    }
  },


}