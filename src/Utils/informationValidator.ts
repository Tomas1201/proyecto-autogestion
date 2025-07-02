
class InformationValidator {
    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isValidLegajo(legajo: number): boolean {
        return Number.isInteger(legajo) && legajo > 0;
    }

    static isValidStatus(status: string): boolean {
        const validStatuses = ['activo', 'inactivo', 'graduado'];
        return validStatuses.includes(status);
    }

    static iscompliteAlumnoData(alumnoData: any): boolean {
        return (
            typeof alumnoData.nombre === 'string' &&
            typeof alumnoData.apellido === 'string' &&
            this.isValidEmail(alumnoData.email) &&
            this.isValidLegajo(alumnoData.legajo) &&
            this.isValidStatus(alumnoData.status)
        );
    }
}