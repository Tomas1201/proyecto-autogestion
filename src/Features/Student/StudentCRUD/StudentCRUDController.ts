/**
 * @file Manages the HTTP requests for Student CRUD operations.
 * It acts as the controller layer in the MVC pattern for the Student feature,
 * handling incoming API requests, calling the appropriate service methods, and sending back responses.
 */

import { StudentService } from "./StudentCRUDService.js";
import { Request, Response, NextFunction } from "express";

/**
 * A controller object that contains methods for handling student-related API endpoints.
 */
export const StudentController = {
  /**
   * Retrieves a single student by their ID.
   * @param {Request} req - The Express request object, containing the student ID in `req.params`.
   * @param {Response} res - The Express response object.
   */
  getStudent: async (req: Request, res: Response, next: NextFunction) => {
    const { Id } = req.params;

    try {
      const Student = await StudentService.getById(Id);
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

  /**
   * Retrieves a list of all students.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  getAllStudents: async (req: Request, res: Response) => {
    try {
      const Students = await StudentService.getAll();
      res.status(200).json({ status: "OK", data: Students });
    } catch (error) {
      console.error("Error buscando alumnos:", error);
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  },

  /**
   * Creates a new student.
   * The student data is expected in the request body.
   * @param {Request} req - The Express request object, containing student data in `req.body`.
   * @param {Response} res - The Express response object.
   */
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

  /**
   * Creates a new registration for a student in a subject.
   * Expects `asignatura_id` and `alumno_id` in the request body.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
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

  /**
   * Updates an existing student's information by their ID.
   * @param {Request} req - The Express request object, with the ID in `req.params` and update data in `req.body`.
   * @param {Response} res - The Express response object.
   */
  UpdateStudent: async (req: Request, res: Response) => {
    const { Id } = req.params;
    const alumno = req.body;
    try {
      const updatedAlumno = await StudentService.update(Id, alumno);
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

  /**
   * Changes the status of a student (e.g., 'active', 'inactive'). This is equivalent to a soft delete.
   * @param {Request} req - The Express request object, with the student ID and new status in `req.params`.
   * @param {Response} res - The Express response object.
   */
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
  /*
  // This is an example of how a hard delete could be implemented,
  // but it's commented out in favor of the soft-delete approach (ChangeStatusStudent).
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
