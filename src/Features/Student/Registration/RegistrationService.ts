
import { RegistrationInterface } from './RegistrationInterface.js';

export class RegistrationService {
    constructor(private RegistrationRepositoryI: RegistrationInterface) { }

    async CreateSubjectRegistration(alumnoid: number, asignaturaid: number) {
        try {
            const newInscripcion = await this.RegistrationRepositoryI.CreateSubjectRegistration(alumnoid, asignaturaid);
            return newInscripcion;
        } catch (error) {
            console.error('Error creating alumno inscripcion:', error);
            throw new Error('Database error');
        }
    }
}
