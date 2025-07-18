import express from 'express';
import { AssignmentService } from '../Services/AssignmentService.js';
import {catchAsync} from '../Utils/catchAsync.js';

const router = express.Router();
const service = new AssignmentService();

router.post('/asignar', catchAsync(async (req, res) => {
  const { profesores, asignaturas, rol } = req.body;
  if (!profesores || !asignaturas || !rol) {
    return res.status(400).json({ error: 'Faltan datos requeridos para la asignación.' });
  }
  const result = await service.assign(profesores, asignaturas, rol);
  res.status(201).json({ message: 'Asignación realizada exitosamente', result });
}));

router.delete('/desvincular', catchAsync(async (req, res) => {
  const { profesorId, asignaturaId } = req.body;
  if (!profesorId || !asignaturaId) {
    return res.status(400).json({ error: 'Faltan datos requeridos para la desvinculación.' });
  }
  const result = await service.unassign(profesorId, asignaturaId);
  res.status(200).json(result);
}));

export default router;
