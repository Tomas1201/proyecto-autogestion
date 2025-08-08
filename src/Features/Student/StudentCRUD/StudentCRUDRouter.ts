import { Router } from "express";
import { StudentController } from "./StudentCRUDController.js";
import { ValidateStudent,ValidateStudentUpdate} from "../StudentValidationMiddleware.js";

const router = Router();

// Devuelve todos los alumnos
router.get("/", StudentController.getAllStudents);

// Devuelve un alumno por ID
router.get("/:Id", StudentController.getStudent);



// Crea un nuevo alumno
router.post("/", ValidateStudent, StudentController.CreateStudent);

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
 StudentController.CreateStudentSubject
);

// Actualiza un alumno por ID
router.put("/:Id", ValidateStudentUpdate, StudentController.UpdateStudent);


/*Chequear reglas de negocio sobre este endpoint(puede el admin cambiarlo libremente?) */
router.put(
  "/:Id/status/:Status",
  ValidateStudentUpdate,
 StudentController.ChangeStatusStudent
);

router.post(
  "/asignatura/:asignaturaid/inscripcion/alumno/:alumnoid",
 StudentController.CreateStudentSubject
);
//router.delete('/:id', StudentController.changeStateAlumno);

export { router as StudentCRUDRouter };
