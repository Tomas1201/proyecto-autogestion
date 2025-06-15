import { Router } from 'express';
import { ProfessorController } from './ProfessorController.js';
import { academicAdminOnly } from '../Utils/authMiddleware.js';
import { professorValidationRules } from '../Utils/Sanitizador.js';

const router = Router();

router.get('/', ProfessorController.getAllProfessors);
router.get('/:id', ProfessorController.getProfessor);
router.get('/nombre/:name', ProfessorController.getProfessorByName);
router.get('/apellido/:apellido', ProfessorController.getProfessorByApellido);
router.get('/dni/:dni', ProfessorController.getProfessorByDni);
router.get('/legajo/:legajo', ProfessorController.getProfessorByLegajo);

router.post('/', professorValidationRules, ProfessorController.createProfessor);
router.put('/:id', professorValidationRules, ProfessorController.updateProfessor);
router.patch('/:id/archive', ProfessorController.archiveProfessor);

export default router;

