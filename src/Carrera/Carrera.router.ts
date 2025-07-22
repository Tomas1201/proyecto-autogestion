import { Router } from 'express';
import * as carrera from './Carrera.Controller.js';

const router = Router();

router.get('/:id', carrera.CarreraController.getById);
router.get('/', carrera.CarreraController.getAll);
router.get('/search/:name', carrera.CarreraController.getByName);
router.post('/', carrera.CarreraController.create);
router.put('/:id', carrera.CarreraController.update);
router.delete('/:id', carrera.CarreraController.delete);


export default router;
