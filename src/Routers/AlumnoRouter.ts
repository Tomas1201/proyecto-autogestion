import { Router } from 'express';
const router = Router();
import { AlumnoController } from '../Controllers/AlumnoController.js';



router.get('/',AlumnoController.getAllAlumnos);

router.get('/:id', AlumnoController.getAlumno);

router.get('/nombre/:name', AlumnoController.getAlumnoByName);

router.get('/apellido/:apellido', AlumnoController.getAlumnoByApellido);

router.post('/', AlumnoController.createAlumno);

router.put('/:id', AlumnoController.updateAlumno);

router.delete('/:id', AlumnoController.deleteAlumno);


export default router;

