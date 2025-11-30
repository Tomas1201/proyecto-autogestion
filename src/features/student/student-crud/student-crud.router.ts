import { Router } from "express";
import { studentController } from "./student-crud.controller.js";
import { ValidateStudent, ValidateStudentUpdate } from "../student-validation.middleware.js";
import "../../../shared/middlewares/protection.middleware.js";
const router = Router();



router.get("/", studentController.getAllStudents);


router.get("/:Id", studentController.getStudent);




router.post("/", ValidateStudent, studentController.CreateStudent);


router.post(
  "/carrera/inscripcion",
  ValidateStudent,
  studentController.CreateStudentSubject
);


router.put("/:id", ValidateStudentUpdate, studentController.UpdateStudent);



router.put(
  "/:Id/status/:Status",
  ValidateStudentUpdate,
  studentController.ChangeStatusStudent
);

router.post(
  "/asignatura/:asignaturaid/inscripcion/alumno/:alumnoid",
  studentController.CreateStudentSubject
);
router.post(
  "/registerToSubject/:id",
  studentController.registerStudentToSubject
);

export { router as studentCRUDRouter };
