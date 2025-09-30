
import { Student } from "../../../Shared/Models/StudentModel.js";
import { StudentStatusInterface } from "./StudentStatusInterface.js";

export class StudentStatusRepository implements StudentStatusInterface {
    static instance: StudentStatusRepository;
    static getInstance(): StudentStatusRepository {
        if (!StudentStatusRepository.instance) {
            StudentStatusRepository.instance = new StudentStatusRepository();
        }
        return StudentStatusRepository.instance;
    }
    constructor() { }

    async ChangeStatus(id: number, status: string): Promise<boolean> {
        try {
            const [updatedRows] = await Student.update(
                { status: status },
                {
                    where: { id },
                }
            );
            return updatedRows > 0 ? true : false;
        } catch (error) {
            console.error("Error changing alumno status:", error);
            throw new Error("Database error");
        }
    }
}
