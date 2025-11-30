import { Request, Response } from "express";
import { CycleElectiveService } from "./cycle-elective.service.js";
import { z } from "zod";

const CreateCycleSchema = z.object({
    year: z.number(),
    startTime: z.string().transform((str) => new Date(str)),
    finalTime: z.string().transform((str) => new Date(str)),
    fourMonthPeriod: z.number(),
});

const ToggleExamTablesSchema = z.object({
    enabled: z.boolean(),
});

export class CycleElectiveController {
    private service = new CycleElectiveService();

    public createCycle = async (req: Request, res: Response): Promise<void> => {
        try {
            const validatedData = CreateCycleSchema.parse(req.body);
            const result = await this.service.createCycle(validatedData);
            res.status(201).json(result);
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ errors: (error as any).errors });
            } else {
                res.status(500).json({ message: "Error creating cycle", error: error.message });
            }
        }
    };

    public getAllCycles = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.service.getAllCycles();
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: "Error retrieving cycles", error: error.message });
        }
    };

    public getCurrentCycle = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.service.getCurrentCycle();
            if (!result) {
                res.status(404).json({ message: "No active cycle found" });
                return;
            }
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: "Error retrieving current cycle", error: error.message });
        }
    };

    public toggleExamTables = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { enabled } = ToggleExamTablesSchema.parse(req.body);
            const result = await this.service.toggleExamTables(id, enabled);
            res.status(200).json(result);
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ errors: (error as any).errors });
            } else {
                res.status(500).json({ message: "Error toggling exam tables", error: error.message });
            }
        }
    };
}
