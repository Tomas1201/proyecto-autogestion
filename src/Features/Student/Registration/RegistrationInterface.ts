
export interface RegistrationInterface {
    CreateSubjectRegistration(alumnoid: number, asignaturaid: number): Promise<any>;
}
