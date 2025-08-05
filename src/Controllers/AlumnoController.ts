import { AlumnoService } from "../Services/AlumnoService.js";
import { Request, Response, NextFunction } from "express";

export const AlumnoController = {
  getAlumno: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      if (!id || isNaN(Number(id))) {
        res
          .status(400)
          .json({ status: 400, message: "Invalid ID format", ERROR_CODE: 400 });
        return;
      }
      const alumno = await AlumnoService.getById(Number(id));
      if (!alumno) {
        res
          .status(404)
          .json({ status: 404, message: "Alumno not found", ERROR_CODE: 404 });
        return;
      }
      res.status(200).json({ status: "OK", data: alumno });
      return;
    } catch (error) {
      console.error("Error buscando alumno:", error);
      res.status(500).json({ status: 500, message: "Internal server error" });
      return;
    }
  },

  getAllAlumnos: async (req: Request, res: Response) => {
    try {
      const alumnos = await AlumnoService.getAll();
      res.status(200).json({ status: "OK", data: alumnos });
    } catch (error) {
      console.error("Error buscando alumnos:", error);
      res
        .status(500)
        .json({ status: "500", data: { error: "Internal server error" } });
    }
  },

  getAlumnoByName: async (req: Request, res: Response) => {
    const { name } = req.params;

    try {
      const alumnos = await AlumnoService.getByName(name);

      if (!alumnos || alumnos.length === 0) {
        res
          .status(404)
          .json({ status: 404, message: "No alumnos found with that name" });
        return;
      }
      res.status(200).json({ status: 200, data: alumnos });
      return;
    } catch (error) {
      console.error("Error fetching alumno by name:", error);
      res.status(500).json({ status: 500, message: "Internal server error" });
      return;
    }
  },

  getAlumnoByApellido: async (req: Request, res: Response) => {
    const { apellido } = req.params;

    try {
      const alumnos = await AlumnoService.getByApellido(apellido);

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

  getByAsignatura: async (req: Request, res: Response) => {
    const { asignatura } = req.params;
    try {
      const alumnos = await AlumnoService.getByAsignatura(asignatura);
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

  getByCarrera: async (req: Request, res: Response) => {
    const { carrera } = req.params;
    try {
      const alumnos = await AlumnoService.getByCarrera(carrera);
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

  createAlumno: async (req: Request, res: Response) => {
    const alumno = req.body;
    try {
      const newAlumno = await AlumnoService.create(alumno);
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

  createAlumnoAsignatura: async (req: Request, res: Response) => {
    const asignaturaid = Number(req.body.asignatura_id);
    const alumnoid = Number(req.body.alumno_id);

    try {
      const newinscripcion = await AlumnoService.createAsignaturainscripcion(
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

  updateAlumno: async (req: Request, res: Response) => {
    const { id } = req.params;
    const alumno = req.body;
    try {
      if (!id || isNaN(Number(id))) {
        res
          .status(400)
          .json({ status: 400, message: "Invalid ID format", ERROR_CODE: 400 });
        return;
      }
      const updatedAlumno = await AlumnoService.update(Number(id), alumno);
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

  ChangeStatusAlumno: async (req: Request, res: Response) => {
    const { id, status } = req.params;
    try {
      if (!id || isNaN(Number(id))) {
        res
          .status(400)
          .json({ status: 400, message: "Invalid ID format", ERROR_CODE: 
400 });
        return;
      }
      const updatedAlumno = await AlumnoService.changeStatus(Number(id), status);
      if (!updatedAlumno) {
        res.status(404).json({ status: 404, message: "Alumno not found" });
        return;
      }
      res.status(200).json({ status: 200, data: updatedAlumno });
      return;
    } catch (error) {
      console.error("Error changing alumno status:", error);
      res.status(500).json({ status: 500, message: "Internal server error" });
      return;
    }
  },
  /*
  deleteAlumno: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deleted = await AlumnoService.delete(id);
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
