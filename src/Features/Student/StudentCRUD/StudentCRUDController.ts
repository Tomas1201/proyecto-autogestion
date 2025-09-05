import { StudentService } from "./StudentCRUDService.js";
import { Request, Response, NextFunction } from "express";

export class StudentController{

  constructor(private StudentService: StudentService) {}

  async getStudent(req: Request, res: Response, next: NextFunction){
    const { Id } = req.params;

    try {
      if (!Id || isNaN(Number(Id))) {
        res
          .status(400)
          .json({ status: 400, message: "Invalid ID format", ERROR_CODE: 400 });
        return;
      }
      const Student = await this.StudentService.getById(Number(Id));
      if (!Student) {
        res
          .status(404)
          .json({ status: 404, message: "Alumno not found", ERROR_CODE: 404 });
        return;
      }
      res.status(200).json({ status: "OK", data: Student });
      return;
    } catch (error) {
      console.error("Error buscando alumno:", error);
      res.status(500).json({ status: 500, message: "Internal server error" });
      return;
    }
  }

  async getAllStudents(req: Request, res: Response) {
    try {
      const Students = await this.StudentService.getAll();
      res.status(200).json({ status: "OK", data: Students });
    } catch (error) {
      console.error("Error buscando alumnos:", error);
      res
        .status(500)
        .json({ status: "500", data: { error: "Internal server error" } });
    }
  }

  async CreateStudent (req: Request, res: Response) {
    const alumno = req.body;
    try {
      const newAlumno = await this.StudentService.Create(alumno);
      if (!newAlumno) {
        res
          .status(400)
          .json({
            status: 400,
            message: "Alumno with the same email, dni or legajo already exists",
          });
        return;
      }
      res.setHeader("Location", `/api/v1/alumnos/${newAlumno.get("id")}`);
      res.status(201).json({ status: 201, data: newAlumno });
    } catch (error) {
      console.error("Error creating alumno:", error);
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  }

  async CreateStudentSubject(req: Request, res: Response) {
    const asignaturaid = Number(req.body.asignatura_id);
    const alumnoid = Number(req.body.alumno_id);

    try {
      const newinscripcion = await this.StudentService.CreateSubjectRegistration(
        alumnoid,
        asignaturaid
      );
      res.json({ status: 201, data: newinscripcion });
      return;
    } catch (error) {
      console.error("Error creating alumno inscripcion:", error);
      res.status(500).json({ status: 500, message: "Internal server error" });
      return;
    }
  }

  async UpdateStudent (req: Request, res: Response) {
    const { id } = req.params;
    const alumno = req.body;
    try {
      if (!id || isNaN(Number(id))) {
        res
          .status(400)
          .json({ status: 400, message: "Invalid ID format", ERROR_CODE: 400 });
        return;
      }
      const updatedAlumno = await this.StudentService.update(Number(id), alumno);
      if (!updatedAlumno) {
        res.status(404).json({ status: 404, message: "Alumno not found" });
        return;
      }
      res.status(200).json({ status: 200, data: updatedAlumno });
      return;
    } catch (error) {
      console.error("Error updating alumno:", error);
      res.status(500).json({ status: 500, message: "Internal server error" });
      return;
    }
  }

  async ChangeStatusStudent (req: Request, res: Response) {
    const { id, status } = req.params;
    try {
      if (!id || isNaN(Number(id))) {
        res
          .status(400)
          .json({ status: 400, message: "Invalid ID format", ERROR_CODE: 
400 });
        return;
      }
      const UpdatedStudent = await this.StudentService.changeStatus(Number(id), status);
      if (!UpdatedStudent) {
        res.status(404).json({ status: 404, message: "Alumno not found" });
        return;
      }
      res.status(200).json({ status: 200, data: UpdatedStudent });
      return;
    } catch (error) {
      console.error("Error changing student status:", error);
      res.status(500).json({ status: 500, message: "Internal server error" });
      return;
    }
  }
};
