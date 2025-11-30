import { number } from "zod";
import { Career } from "../../shared/models/career.model.js";
import { SubjectPlanModel } from "../../shared/models/domain/subject-plan.model.js";
import { Subject } from "../../shared/models/subject.model.js";

export interface SubjectPlanData {
  subjectId: string;
  year: number;
  fourMonthPeriod?: number;
  isAnnual: boolean;
  workload: number;
  isOptional: boolean;
}

export class CareerSubjectRepository {
  public async addSubjectToPlan(data: SubjectPlanData): Promise<SubjectPlanModel> {
    return SubjectPlanModel.create(data as any);
  }

  public async getSubjectsByCareer(careerId: string): Promise<any> {
    return Career.findByPk(careerId, {
      attributes: ['id', 'name'],
      include: [{
        model: SubjectPlanModel,
        attributes: ['id', 'year', 'fourMonthPeriod', 'isAnnual'], 
        include: [{
          model: Subject,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }]
      }]
    });
  }

  public async removeSubjectFromPlan(subjectPlanId: number): Promise<number> {
    return SubjectPlanModel.destroy({ where: { id: subjectPlanId } });
  }
}
