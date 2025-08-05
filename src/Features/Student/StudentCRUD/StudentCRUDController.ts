import { StudentService } from "./StudentCRUDService.js";
import { Request, Response, NextFunction } from "express";

export const StudentController = {
  getStudent: async (req: Request, res: Response, next: NextFunction) => {
    const { Id } = req.params;

    try {
      if (!Id || isNaN(Number(Id))) {
        res
          .status(400)
          .json({ status: 400, message: "Invalid ID format", ERROR_CODE: 400 });
        return;
      }
      const Student = await StudentService.getById(Number(Id));
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

  getStudentsByName: async (req: Request, res: Response) => {
    const { name } = req.params;

    try {
      const Students = await StudentService.getByName(name);

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
      const Students = await StudentService.getByLastName(LastName);

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
      const alumnos = await StudentService.getBySubject(asignatura);
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
      const alumnos = await StudentService.getByCareer(carrera);
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
    const { id } = req.params;
    const alumno = req.body;
    try {
      if (!id || isNaN(Number(id))) {
        res
          .status(400)
          .json({ status: 400, message: "Invalid ID format", ERROR_CODE: 400 });
        return;
      }
      const updatedAlumno = await StudentService.update(Number(id), alumno);
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

  ChangeStatusStudent: async (req: Request, res: Response) => {
    const { id, status } = req.params;
    try {
      if (!id || isNaN(Number(id))) {
        res
          .status(400)
          .json({ status: 400, message: "Invalid ID format", ERROR_CODE: 
400 });
        return;
      }
      const UpdatedStudent = await StudentService.changeStatus(Number(id), status);
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
