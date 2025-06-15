import { Router, Request, Response, NextFunction } from 'express';
import { academicAdminOnly } from '../Utils/authMiddleware';
import { AssignmentService } from '../Services/AssignmentService';

const router = Router();

// Middleware de autenticación con firma correcta
const academicAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    academicAdminOnly(req, res, next);
};

router.post('/confirm', academicAdminMiddleware, async (req: Request, res: Response) => {
    const { action, entityId } = req.body;
    
    try {
        if (action === 'unassign') {
            const result = await AssignmentService.unassignProfessor(entityId);
            res.json({ 
                confirmationId: Date.now().toString(36), 
                success: true,
                result
            });
        } else {
            res.status(400).json({ error: 'Invalid action' });
        }
    } catch (error) {
        console.error('Confirmation error:', error);
        res.status(500).json({ error: 'Confirmation failed' });
    }
});

export const ConfirmacionRouter = router;