
import { Registration } from "../../../Shared/Models/Domain/RegistrationModel.js";
import { RegistrationInterface } from "./RegistrationInterface.js";

export class RegistrationRepository implements RegistrationInterface {
    static instance: RegistrationRepository;
    static getInstance(): RegistrationRepository {
        if (!RegistrationRepository.instance) {
            RegistrationRepository.instance = new RegistrationRepository();
        }
        return RegistrationRepository.instance;
    }
    constructor() { }

    async CreateSubjectRegistration(alumnoid: number, asignaturaid: number): Promise<any> {
        try {
            // Luego, crea la inscripción a la asignatura
            const Registrationf = await Registration.create({
                alumno_id: alumnoid,
                PuestoAcademicoid: asignaturaid, // Asegúrate de que 'asignatura' sea un ID válido
            });

            return { alumno: Registrationf };
        } catch (error) {
            console.error("Error creating alumno and asignatura inscripcion:", error);
            throw new Error("Database error");
        }
    }
}
