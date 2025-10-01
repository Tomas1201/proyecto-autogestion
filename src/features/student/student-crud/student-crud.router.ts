import { Router } from "express";
import { studentController } from "./student-crud.controller.js";
import { ValidateStudent,ValidateStudentUpdate} from "../student-validation.middleware.js";

const router = Router();

// Devuelve todos los alumnos
router.get("/", studentController.getAllStudents);

// Devuelve un alumno por ID
router.get("/:Id", studentController.getStudent);



// Crea un nuevo alumno
router.post("/", ValidateStudent, studentController.CreateStudent);

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
  ValidateStudent,
 studentController.CreateStudentSubject
);

// Actualiza un alumno por ID
router.put("/:Id", ValidateStudentUpdate, studentController.UpdateStudent);


/*Chequear reglas de negocio sobre este endpoint(puede el admin cambiarlo libremente?) */
router.put(
  "/:Id/status/:Status",
  ValidateStudentUpdate,
 studentController.ChangeStatusStudent
);

router.post(
  "/asignatura/:asignaturaid/inscripcion/alumno/:alumnoid",
 studentController.CreateStudentSubject
);
//router.delete('/:id', studentController.changeStateAlumno);

export { router as studentCRUDRouter };
