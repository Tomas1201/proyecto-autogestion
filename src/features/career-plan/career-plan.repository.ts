import { CareerPlanModel as CareerPlan } from '../../shared/models/domain/career-plan.model.js';
import { SubjectPlanModel as SubjectPlan } from '../../shared/models/domain/subject-plan.model.js';
import { Subject } from '../../shared/models/subject.model.js';
import { CareerPlanCreationAttributes, SubjectToPlanAttributes } from './career-plan.interface.js';
import { CreationAttributes } from 'sequelize';

export class CareerPlanRepository {

    public async create(data: CareerPlanCreationAttributes): Promise<CareerPlan> {
        const creationData: CreationAttributes<CareerPlan> = {
            careerId: data.careerId,
            cycleElectiveId: data.cycleElectiveId
        };
        return await CareerPlan.create(creationData);
    }

    public async findById(id: string): Promise<CareerPlan | null> {
        return await CareerPlan.findByPk(id, {
            include: [
                {
                    model: Subject,
                    as: 'subjects',
                    through: { attributes: ['year', 'semester', 'workload', 'isOptional'] }
                }
            ]
        });
    }

    public async findByCareer(careerId: string): Promise<CareerPlan[]> {
        return await CareerPlan.findAll({ where: { careerId } });
    }

    public async update(id: string, data: Partial<CareerPlanCreationAttributes>): Promise<[number]> {
        return await CareerPlan.update(data, { where: { id } });
    }

    public async delete(id: string): Promise<number> {
        return await CareerPlan.destroy({ where: { id } });
    }

    public async addSubjectToPlan(planId: string, subjectData: SubjectToPlanAttributes): Promise<SubjectPlan> {
        const dataToCreate = {
            careerPlanId: planId,
            subjectId: subjectData.subjectId,
            year: subjectData.year,
            semester: subjectData.semester,
            workload: subjectData.workload,
            isOptional: subjectData.isOptional,
        };
        return await SubjectPlan.create(dataToCreate);
    }

    public async removeSubjectFromPlan(planId: string, subjectId: string): Promise<number> {
        return await SubjectPlan.destroy({
            where: {
                careerPlanId: planId,
                subjectId: subjectId
            }
        });
    }
}
