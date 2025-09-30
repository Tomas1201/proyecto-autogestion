
import express from 'express';
import { RegistrationController } from './RegistrationController.js';
import { RegistrationService } from './RegistrationService.js';
import { RegistrationRepository } from './RegistrationRepository.js';

const router = express.Router();
const registrationRepository = new RegistrationRepository();
const registrationService = new RegistrationService(registrationRepository);
const registrationController = new RegistrationController(registrationService);

router.post('/register', registrationController.createSubjectRegistration.bind(registrationController));

export default router;
