import express from 'express';
import { Request, Response, NextFunction } from "express";
import {StudentSearchService} from './StudentSearchService.js';

export class StudentSearchController {
  private static instance: StudentSearchController;
  private studentService: StudentSearchService;

  private constructor() {
    this.studentService = StudentSearchService.getInstance();
  }

  public static getInstance(): StudentSearchController {
    if (!StudentSearchController.instance) {
      StudentSearchController.instance = new StudentSearchController();
    }
    return StudentSearchController.instance;
  }

  public async getStudentsByName(req: Request, res: Response): Promise<void> {
    const { name } = req.params;

    try {
      const students = await this.studentService.getByName(name);

      if (!students || students.length === 0) {
        res.status(404).json({ 
          status: 404, 
          message: "No alumnos found with that name" 
        });
        return;
      }
      res.status(200).json({ status: 200, data: students });
    } catch (error) {
      console.error("Error fetching alumno by name:", error);
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  }

  public async getStudentsByLastName(req: Request, res: Response): Promise<void> {
    const { LastName } = req.params;

    try {
      const students = await this.studentService.getByLastName(LastName);

      if (!students || students.length === 0) {
        res.status(404).json({
          status: 404,
          message: "No alumnos found with that apellido",
        });
        return;
      }
      res.status(200).json({ status: 200, data: students });
    } catch (error) {
      console.error("Error fetching student by last name:", error);
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  }

  public async getBySubject(req: Request, res: Response): Promise<void> {
    const { asignatura } = req.params;
    try {
      const alumnos = await this.studentService.getBySubject(asignatura);
      if (!alumnos || alumnos.length === 0) {
        res.status(404).json({
          status: 404,
          message: "No alumnos found in that subject",
        });
        return;
      }
      res.status(200).json({ status: 200, data: alumnos });
    } catch (error) {
      console.error("Error fetching alumno by subject:", error);
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  }

  public async getByCareer(req: Request, res: Response): Promise<void> {
    const { carrera } = req.params;
    try {
      const alumnos = await this.studentService.getByCareer(carrera);
      if (!alumnos || alumnos.length === 0) {
        res.status(404).json({
          status: 404,
          message: "No alumnos found in that career",
        });
        return;
      }
      res.status(200).json({ status: 200, data: alumnos });
    } catch (error) {
      console.error("Error fetching alumno by career:", error);
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  }
}