
import express from 'express';
import { StudentStatusController } from './StudentStatusController.js';
import { StudentStatusService } from './StudentStatusService.js';
import { StudentStatusRepository } from './StudentStatusRepository.js';

const router = express.Router();
const studentStatusRepository = new StudentStatusRepository();
const studentStatusService = new StudentStatusService(studentStatusRepository);
const studentStatusController = new StudentStatusController(studentStatusService);

router.put('/:id/status', studentStatusController.changeStatus.bind(studentStatusController));

export default router;
