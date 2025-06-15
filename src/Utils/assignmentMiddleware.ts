export const validateAssignment = [
    body('professorId').isInt(),
    body('asignaturaId').isInt(),
    body('rol').isIn(['titular', 'adjunto', 'ayudante']),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];