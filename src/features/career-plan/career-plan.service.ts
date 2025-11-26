import { CareerPlanRepository } from './career-plan.repository.js';
import { CareerPlanCreationAttributes, SubjectToPlanAttributes } from './career-plan.interface.js';
import { CareerPlanModel as CareerPlan } from '../../shared/models/domain/career-plan.model.js';
import { SubjectPlanModel as SubjectPlan } from '../../shared/models/domain/subject-plan.model.js';
import { Career } from '../../shared/models/career.model.js';
import { Subject } from '../../shared/models/subject.model.js';
import { CycleElectiveModel as CycleElective } from '../../shared/models/domain/cycle-electivo.model.js';

export class CareerPlanService {
    
    private repository: CareerPlanRepository;

    constructor() {
        this.repository = new CareerPlanRepository();
    }

    public async create(data: CareerPlanCreationAttributes): Promise<CareerPlan> {
        const career = await Career.findByPk(data.careerId);
        if (!career) {
            throw new Error('Career not found');
        }
        const cycleElective = await CycleElective.findByPk(data.cycleElectiveId);
        if (!cycleElective) {
            throw new Error('CycleElective not found');
        }
        return await this.repository.create(data);
    }

    public async findById(id: string): Promise<CareerPlan | null> {
        const plan = await this.repository.findById(id);
        if (!plan) {
            throw new Error('Career plan not found');
        }
        return plan;
    }

    public async findByCareer(careerId: string): Promise<CareerPlan[]> {
        return await this.repository.findByCareer(careerId);
    }

    public async update(id: string, data: Partial<CareerPlanCreationAttributes>): Promise<CareerPlan> {
        await this.findById(id); // Ensure plan exists
        if (data.careerId) {
            const career = await Career.findByPk(data.careerId);
            if (!career) {
                throw new Error('Career not found');
            }
        }
        if (data.cycleElectiveId) {
            const cycleElective = await CycleElective.findByPk(data.cycleElectiveId);
            if (!cycleElective) {
                throw new Error('CycleElective not found');
            }
        }
        await this.repository.update(id, data);
        return (await this.findById(id))!;
    }

    public async delete(id: string): Promise<void> {
        await this.findById(id); // Ensure plan exists
        await this.repository.delete(id);
    }

    public async addSubjectToPlan(planId: string, subjectData: SubjectToPlanAttributes): Promise<SubjectPlan> {
        await this.findById(planId); // Ensure plan exists
        const subject = await Subject.findByPk(subjectData.subjectId);
        if (!subject) {
            throw new Error('Subject not found');
        }

        const existingAssociation = await SubjectPlan.findOne({
            where: { careerPlanId: planId, subjectId: subjectData.subjectId }
        });

        if (existingAssociation) {
            throw new Error('Subject already associated with this plan');
        }

        return await this.repository.addSubjectToPlan(planId, subjectData);
    }

    public async removeSubjectFromPlan(planId: string, subjectId: string): Promise<void> {
        await this.findById(planId); // Ensure plan exists
        const subject = await Subject.findByPk(subjectId);
        if (!subject) {
            throw new Error('Subject not found');
        }

        const result = await this.repository.removeSubjectFromPlan(planId, subjectId);
        if (result === 0) {
            throw new Error('Subject was not associated with this plan');
        }
    }
}
