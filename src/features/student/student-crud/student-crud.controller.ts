
import { StudentService } from "./student-crud.service.js";
import { Request, Response, NextFunction } from "express";

export const studentController = {
 
  getStudent: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const Student = await StudentService.getById(id);
      if (!Student) {
        res
          .status(404)
          .json({ status: 404, message: "Student not found" });
          return;
      }
      res.status(200).json({ status: "OK", data: Student });
      return;
    } catch (error) {
      
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
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  },

  
  CreateStudent: async (req: Request, res: Response) => {
    const alumno = req.body;
    try {
      const newAlumno = await StudentService.Create(alumno);
      if (!newAlumno) {
         res.status(409).json({
          status: 409,
          message: "Student with the same email, DNI, or file number already exists",
        });
        return;
      }
      res.setHeader("Location", `/api/v1/students/${newAlumno.get("Id")}`);
      res.status(201).json({ status: 201, message: "Student created successfully", data: newAlumno });
      return;
    } catch (error) {
      
      res.status(500).json({ status: 500, message: "Internal server error" });
      return
    }
  },

  
  CreateStudentSubject: async (req: Request, res: Response) => {
    const asignaturaid = Number(req.body.asignatura_id);
    const alumnoid = Number(req.body.alumno_id);

    try {
      const newInscripcion = await StudentService.CreateSubjectRegistration(
        alumnoid,
        asignaturaid
      );
      res.status(201).json({ status: 201, message: "Student successfully registered to subject", data: newInscripcion });
      return;
    } catch (error) {
      
      res.status(500).json({ status: 500, message: "Internal server error" });
      return;
    }
  },

 
  UpdateStudent: async (req: Request, res: Response) => {
    const { id } = req.params;
    const alumno = req.body;
    try {
      const updatedAlumno = await StudentService.update(id, alumno);
      if (!updatedAlumno) {
       res.status(404).json({ status: 404, message: "Student not found or no changes were made" });
       return;
      }
      res.status(200).json({ status: 200, message: "Student updated successfully" });
      return;
    } catch (error) {
      
      res.status(500).json({ status: 500, message: "Internal server error" });
      return;
    }
  },

 
  ChangeStatusStudent: async (req: Request, res: Response) => {
    const { Id, Status } = req.params;

    if (!Status) {
         res.status(400).json({ status: 400, message: "Status parameter is required" });
         return;
    }

    try {
      const UpdatedStudent = await StudentService.changeStatus(Id, Status);
      if (!UpdatedStudent) {
         res.status(404).json({ status: 404, message: "Student not found or status not changed" });
         return;
      }
      res.status(200).json({ status: 200, message: `Student status successfully changed to '${Status}'` });
      return;
    } catch (error) {
      
      res.status(500).json({ status: 500, message: "Internal server error" });
      return;
    }
  },
 
};
