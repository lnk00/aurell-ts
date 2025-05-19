import { Hono } from 'hono';
import { corsMiddleware } from './features/core/middlewares/cors.middleware';
import coreHandlers from './features/core/handlers';

const app = new Hono();
app.use('*', corsMiddleware);

const routes = app.route('/api/core', coreHandlers);

export type AppType = typeof routes;
export default app;
