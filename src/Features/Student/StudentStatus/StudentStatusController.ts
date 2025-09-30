
import { StudentStatusService } from './StudentStatusService.js';
import { Request, Response } from 'express';

export class StudentStatusController {
    constructor(private studentStatusService: StudentStatusService) { }

    async changeStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updated = await this.studentStatusService.changeStatus(Number(id), status);
            res.json(updated);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
