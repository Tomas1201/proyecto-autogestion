import { CycleElectiveRepository } from "./cycle-elective.repository.js";

export class CycleElectiveService {
    private repository = new CycleElectiveRepository();

    async createCycle(data: any) {
        // Logic to deactivate previous cycles could be added here if needed
        return await this.repository.createCycle(data);
    }

    async getAllCycles() {
        return await this.repository.getAllCycles();
    }

    async getCurrentCycle() {
        return await this.repository.getCurrentCycle();
    }

    async toggleExamTables(id: string, enabled: boolean) {
        return await this.repository.updateCycle(id, { examTablesEnabled: enabled });
    }
}
