import { StudentService } from "./StudentCRUDService.js";
import { Request, Response, NextFunction } from "express";

export const StudentController = {

  getStudent: async (req: Request, res: Response, next: NextFunction) => {
    const { Id } = req.params;

    try {
  
      const Student = await StudentService.getById(Id);
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
  },

  getAllStudents: async (req: Request, res: Response) => {
    try {
      const Students = await StudentService.getAll();
      res.status(200).json({ status: "OK", data: Students });
    } catch (error) {
      console.error("Error buscando alumnos:", error);
      res
        .status(500)
        .json({ status: "500", data: { error: "Internal server error" } });
    }
  },

  CreateStudent: async (req: Request, res: Response) => {
    const alumno = req.body;
    try {
      const newAlumno = await StudentService.Create(alumno);
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
  },

  CreateStudentSubject: async (req: Request, res: Response) => {
    const asignaturaid = Number(req.body.asignatura_id);
    const alumnoid = Number(req.body.alumno_id);

    try {
      const newinscripcion = await StudentService.CreateSubjectRegistration(
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
  },

  UpdateStudent: async (req: Request, res: Response) => {
    const { Id } = req.params;
    const alumno = req.body;
    try {
      
      const updatedAlumno = await StudentService.update(Id, alumno);
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
  },
//Equivalente a Delete
  ChangeStatusStudent: async (req: Request, res: Response) => {
    const { Id, Status } = req.params;
    try {
      
      const UpdatedStudent = await StudentService.changeStatus(Id, Status);
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
  },
  /*
  deleteAlumno: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deleted = await StudentService.delete(id);
      if (!deleted) {
        return res.status(404).json({status:404, message: 'Alumno not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting alumno:', error);
      res.status(500).json({status:500, message: 'Internal server error' });
    }
  })
  */
};
