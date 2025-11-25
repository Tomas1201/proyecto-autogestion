import { CareerPlanModel } from "../../shared/models/domain/career-plan.model.js";
import { Subject } from "../../shared/models/subject.model.js";
import { CareerSubjectRepository, SubjectPlanData } from "./career-subject.repository.js";

export class CareerSubjectService {
  private repository = new CareerSubjectRepository();

  public async addSubjectToPlan(careerPlanId: string, subjectData: Omit<SubjectPlanData, 'careerPlanId'>): Promise<any> {
    // Validate that the career plan and subject exist
    const careerPlan = await CareerPlanModel.findByPk(careerPlanId);
    if (!careerPlan) {
      throw new Error("Career Plan not found");
    }

    const subject = await Subject.findByPk(subjectData.subjectId);
    if (!subject) {
      throw new Error("Subject not found");
    }

    const fullData: SubjectPlanData = {
      ...subjectData,
      careerPlanId,
    };

    return this.repository.addSubjectToPlan(fullData);
  }

  public async getSubjectsByCareer(careerId: string): Promise<any> {
    const careerData = await this.repository.getSubjectsByCareer(careerId);

    if (!careerData) {
      throw new Error("Career not found");
    }

    const plan = careerData.CareerPlanModels?.[0];
    if (!plan || !plan.SubjectPlanModels) {
      return [];
    }

    const formattedSubjects = (plan.SubjectPlanModels as any[]).map(subjectPlan => {
      return {
        subjectPlanId: subjectPlan.id, // Pass the ID for the DELETE endpoint
        year: subjectPlan.year,
        fourMonthPeriod: subjectPlan.fourMonthPeriod,
        isAnnual: subjectPlan.isAnnual,
        subject: subjectPlan.Subject,
      };
    });

    return formattedSubjects;
  }

  public async removeSubjectFromPlan(subjectPlanId: number): Promise<number> {
    const result = await this.repository.removeSubjectFromPlan(subjectPlanId);
    if (result === 0) {
      throw new Error("Subject Plan entry not found");
    }
    return result;
  }
}
