import { Router } from 'express';
import { registerProfessor } from './ProfessorController.js';
import { authMiddleware } from '../Utils/authMiddleware.js';
import { updateProfessor } from './ProfessorController.js';
import { searchProfessors, searchByState ,searchByName, searchByDni, searchByLegajo } from './ProfessorController.js';
import { deleteProfessor } from './ProfessorController.js';
import  {authorizeAdmin}  from '../Utils/authMiddleware.js';
import { catchAsync } from '../Utils/catchAsync.js';
import { archiveProfessor } from './ProfessorController.js';

const router = Router();

// Solo permite a administradores académicos
router.post('/profesores', authMiddleware(['ADMIN_ACADEMICO']), registerProfessor);
router.put('/profesores/:id', authMiddleware(['ADMIN_ACADEMICO']), updateProfessor);
router.get('/profesores/search/state/:state', authMiddleware(['ADMIN_ACADEMICO']), searchByState);
router.put('/profesores/archive/:id', authMiddleware(['ADMIN_ACADEMICO']), archiveProfessor);
router.get('/profesores', authMiddleware(['ADMIN_ACADEMICO']), searchProfessors);
router.get('/profesores/search/name/:name', authMiddleware(['ADMIN_ACADEMICO']), searchByName);
router.get('/profesores/search/dni/:dni', authMiddleware(['ADMIN_ACADEMICO']), searchByDni);
router.get('/profesores/search/legajo/:legajo', authMiddleware(['ADMIN_ACADEMICO']), searchByLegajo);
router.delete('/profesores/:id', authMiddleware(['ADMIN_ACADEMICO']), deleteProfessor);

/*router.post('/', authorizeAdmin, catchAsync(registerProfessor));
router.put('/:id', authorizeAdmin, catchAsync(updateProfessor));
router.delete('/:id', authorizeAdmin, catchAsync(archiveProfessor));

*/
export const P = router;