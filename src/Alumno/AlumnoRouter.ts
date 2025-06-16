import { Router } from 'express';
import { AlumnoController } from './AlumnoController.js';


const router = Router();

// Devuelve todos los alumnos
router.get('/',AlumnoController.getAllAlumnos);

// Devuelve un alumno por ID
router.get('/:id', AlumnoController.getAlumno);

// Devuelve un alumno por nombre
router.get('/nombre/:name', AlumnoController.getAlumnoByName);

// Devuelve un alumno por apellido
router.get('/apellido/:apellido', AlumnoController.getAlumnoByApellido);

router.get('/asignatura/:asignatura', AlumnoController.getByAsignatura);

// Crea un nuevo alumno
router.post('/', AlumnoController.createAlumno);

// Actualiza un alumno por ID
router.put('/:id', AlumnoController.updateAlumno);

// Elimina un alumno por ID
//router.delete('/:id', AlumnoController.deleteAlumno);


export default router;

