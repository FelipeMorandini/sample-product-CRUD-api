import { Application, Router } from 'express';
import { testRouter } from './tests';

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/tests', testRouter);

    app.use('/api/v1', apiRouter);
}