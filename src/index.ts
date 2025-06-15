import express from 'express';
import bodyParser from 'body-parser';
import professorRouter from './Professor/ProfessorRouter.js';
import { ConfirmacionRouter } from './Routers/ConfirmationRouter';

const app = express();
app.use(bodyParser.json());

app.use('/api/v1/professors', professorRouter);
app.use('/api/v1/confirm', ConfirmacionRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Global error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app; // Export the app for testing or further configuration
export { app };
// This is the main entry point of the application.
// 