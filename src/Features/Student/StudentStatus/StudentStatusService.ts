
import { StudentStatusInterface } from './StudentStatusInterface.js';

export class StudentStatusService {
    constructor(private StudentStatusRepositoryI: StudentStatusInterface) { }

    async changeStatus(id: number, status: string) {
        try {
            const updated = await this.StudentStatusRepositoryI.ChangeStatus(id, status);
            if (!updated) {
                throw new Error('Student not found or not updated');
            }
            return updated;
        } catch (error) {
            console.error('Error changing alumno status:', error);
            return;
        }
    }
}
