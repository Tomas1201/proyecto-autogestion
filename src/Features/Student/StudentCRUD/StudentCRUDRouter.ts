import { Router } from "express";
import { StudentController } from "./StudentCRUDController.js";
import {
  validateAlumno,
  validateUpdate,
} from "../../../Middlewares/validationMiddleware.js";

const router = Router();

// Devuelve todos los alumnos
router.get("/", StudentController.getAllStudents);

// Devuelve un alumno por ID
router.get("/:id", StudentController.getStudent);

// Devuelve un alumno por nombre
router.get("/nombre/:name", StudentController.getStudentsByName);

// Devuelve un alumno por apellido
router.get("/apellido/:apellido", StudentController.getStudentsByLastName);

router.get("/asignatura/:asignatura", StudentController.getBySubject);

router.get("/carrera/:carrera", StudentController.getByCareer);

// Crea un nuevo alumno
router.post("/", validateAlumno, StudentController.CreateStudent);

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
 StudentController.CreateStudentSubject
);

// Actualiza un alumno por ID
router.put("/:id", validateAlumno, StudentController.UpdateStudent);


/*Chequear reglas de negocio sobre este endpoint(puede el admin cambiarlo libremente?) */
router.put(
  "/:id/status/:status",
  validateUpdate,
 StudentController.ChangeStatusStudent
);

router.post(
  "/asignatura/:asignaturaid/inscripcion/alumno/:alumnoid",
 StudentController.CreateStudentSubject
);
//router.delete('/:id', StudentController.changeStateAlumno);

export default router;
