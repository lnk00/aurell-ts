import { Hono } from 'hono';
import { corsMiddleware } from './features/core/middlewares/cors.middleware';
import coreHandlers from './features/core/handlers';
import type { Bindings } from './bindings';
import { guardMiddleware } from './features/auth/middlewares/guard.middleware';

const app = new Hono<{ Bindings: Bindings }>();
app.use('*', corsMiddleware);
app.use('*', guardMiddleware);

const routes = app.route('/api/core', coreHandlers);

export type AppType = typeof routes;
export default app;
