import { Router } from "express";
import { StudentController } from "./StudentCRUDController.js";
import { ValidateStudent,ValidateStudentUpdate} from "../StudentValidationMiddleware.js";

const router = Router();
StudentController = new StudentController();
// Devuelve todos los alumnos
router.get("/", StudentController.getAllStudents());

// Devuelve un alumno por ID
router.get("/:id", StudentController.getStudent());



// Crea un nuevo alumno
router.post("/", ValidateStudent, StudentController.CreateStudent);

// Actualiza un alumno por ID
router.put("/:id", ValidateStudentUpdate, StudentController.UpdateStudent);

//router.delete('/:id', StudentController.changeStateAlumno);

export { router as StudentCRUDRouter };
