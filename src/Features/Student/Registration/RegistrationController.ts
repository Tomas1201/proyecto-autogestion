
import { RegistrationService } from './RegistrationService.js';
import { Request, Response } from 'express';

export class RegistrationController {
    constructor(private registrationService: RegistrationService) { }

    async createSubjectRegistration(req: Request, res: Response) {
        try {
            const { alumnoid, asignaturaid } = req.body;
            const newInscripcion = await this.registrationService.CreateSubjectRegistration(alumnoid, asignaturaid);
            res.json(newInscripcion);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
