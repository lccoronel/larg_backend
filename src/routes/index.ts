import { Router } from 'express';

import usersRouter from './users.routes';
import officesRouter from './offices.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/offices', officesRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
