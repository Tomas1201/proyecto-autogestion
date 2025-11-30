import { CycleElectiveModel } from "../../shared/models/domain/cycle-electivo.model.js";

export class CycleElectiveRepository {
    async createCycle(data: any) {
        return await CycleElectiveModel.create(data);
    }

    async getAllCycles() {
        return await CycleElectiveModel.findAll({
            order: [['year', 'DESC'], ['fourMonthPeriod', 'DESC']]
        });
    }

    async getCurrentCycle() {
        return await CycleElectiveModel.findOne({
            where: { state: 'activo' },
            order: [['createdAt', 'DESC']]
        });
    }

    async updateCycle(id: string, data: any) {
        const cycle = await CycleElectiveModel.findByPk(id);
        if (!cycle) throw new Error("Cycle not found");
        return await cycle.update(data);
    }
}
