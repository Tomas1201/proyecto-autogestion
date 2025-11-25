import { Correlation } from "../../shared/models/domain/correlations.model.js";

export interface CorrelationData {
  subjectToTake: string;
  subjectRequiedId: string;
  careerId: string;
}

export class CorrelationRepository {
  public async create(data: CorrelationData): Promise<Correlation> {
    return Correlation.create(data as any);
  }

  public async findByCareer(careerId: string): Promise<Correlation[]> {
    return Correlation.findAll({ where: { careerId } });
  }

  public async delete(correlationId: number): Promise<number> {
    return Correlation.destroy({ where: { id: correlationId } });
  }
}
