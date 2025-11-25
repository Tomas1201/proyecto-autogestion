import { Career } from "../../shared/models/career.model.js";
import { Subject } from "../../shared/models/subject.model.js";
import { Correlation } from "../../shared/models/domain/correlations.model.js";
import { CorrelationRepository, CorrelationData } from "./correlation.repository.js";

export class CorrelationService {
  private repository = new CorrelationRepository();

  public async create(data: CorrelationData): Promise<Correlation> {
    const { careerId, subjectToTake, subjectRequiedId } = data;

    if (subjectToTake === subjectRequiedId) {
      throw new Error("A subject cannot be a prerequisite of itself.");
    }

    // Validate existence of all entities
    const career = await Career.findByPk(careerId);
    if (!career) {
      throw new Error("Career not found.");
    }

    const subjectToTakeExists = await Subject.findByPk(subjectToTake);
    if (!subjectToTakeExists) {
      throw new Error("Subject to take not found.");
    }

    const subjectRequiredExists = await Subject.findByPk(subjectRequiedId);
    if (!subjectRequiredExists) {
      throw new Error("Required subject not found.");
    }

    return this.repository.create(data);
  }

  public async findByCareer(careerId: string): Promise<Correlation[]> {
    return this.repository.findByCareer(careerId);
  }

  public async delete(correlationId: number): Promise<number> {
    const result = await this.repository.delete(correlationId);
    if (result === 0) {
      throw new Error("Correlation not found.");
    }
    return result;
  }
}
