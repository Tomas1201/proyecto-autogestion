import { Request, Response, NextFunction } from 'express';
import { CareerPlanService } from './career-plan.service.js';

export class CareerPlanController {
    
    private service: CareerPlanService;

    constructor() {
        this.service = new CareerPlanService();
    }

    public createPlan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const plan = await this.service.create(req.body);
            res.status(201).json(plan);
        } catch (error) {
            next(error);
        }
    }

    public getPlanById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id;
            const plan = await this.service.findById(id);
            res.status(200).json(plan);
        } catch (error) {
            next(error);
        }
    }

    public getPlansByCareer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const careerId = req.params.careerId;
            const plans = await this.service.findByCareer(careerId);
            res.status(200).json(plans);
        } catch (error) {
            next(error);
        }
    }

    public updatePlan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id;
            const plan = await this.service.update(id, req.body);
            res.status(200).json(plan);
        } catch (error) {
            next(error);
        }
    }

    public deletePlan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id;
            await this.service.delete(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    public addSubject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const planId = req.params.id;
            const association = await this.service.addSubjectToPlan(planId, req.body);
            res.status(201).json(association);
        } catch (error) {
            next(error);
        }
    }

    public removeSubject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { planId, subjectId } = req.params;
            await this.service.removeSubjectFromPlan(planId, subjectId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
