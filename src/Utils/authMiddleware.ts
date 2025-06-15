import { Request, Response, NextFunction } from 'express';

// Extend the Request type to include the user property
declare global {
    namespace Express {
        interface Request {
            user?: { role: string };
        }
    }
}

export const academicAdminOnly = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Simulación: en producción usar JWT
    const user = { role: 'academic_admin' };
    req.user = user;
    
    if (req.user.role !== 'academic_admin') {
        return res.status(403).json({ error: 'Unauthorized access' });
    }
    next();
};