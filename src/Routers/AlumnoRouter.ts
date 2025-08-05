import { Router } from "express";
import { AlumnoController } from "../Controllers/AlumnoController.js";
import {
  validateAlumno,
  validateUpdate,
} from "../Middlewares/validationMiddleware.js";

const router = Router();

// Devuelve todos los alumnos
router.get("/", AlumnoController.getAllAlumnos);

// Devuelve un alumno por ID
router.get("/:id", AlumnoController.getAlumno);

// Devuelve un alumno por nombre
router.get("/nombre/:name", AlumnoController.getAlumnoByName);

// Devuelve un alumno por apellido
router.get("/apellido/:apellido", AlumnoController.getAlumnoByApellido);

router.get("/asignatura/:asignatura", AlumnoController.getByAsignatura);

router.get("/carrera/:carrera", AlumnoController.getByCarrera);

// Crea un nuevo alumno
router.post("/", validateAlumno, AlumnoController.createAlumno);

/*
El usuario tendra que mandar un JSON con los siguientes datos:
{
    carrera_id: number,
    asignatura_id: number,
    alumno_id: number
}
*/
router.post(
  "/carrera/inscripcion",
  validateAlumno,
  AlumnoController.createAlumnoAsignatura
);

// Actualiza un alumno por ID
router.put("/:id", validateAlumno, AlumnoController.updateAlumno);

router.put(
  "/:id/status/:status",
  validateUpdate,
  AlumnoController.ChangeStatusAlumno
);

router.post(
  "/asignatura/:asignaturaid/inscripcion/alumno/:alumnoid",
  AlumnoController.createAlumnoAsignatura
);
//router.delete('/:id', AlumnoController.changeStateAlumno);

export default router;
