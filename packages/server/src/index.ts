import { Hono } from 'hono';
import { corsMiddleware } from './features/core/middlewares/cors.middleware';
import coreHandlers from './features/core/handlers';

export type Bindings = {
	DB: D1Database;
	STYTCH_PROJECT_ID: string;
	STYTCH_SECRET: string;
};

const app = new Hono<{ Bindings: Bindings }>();
app.use('*', corsMiddleware);

const routes = app.route('/api/core', coreHandlers);

export type AppType = typeof routes;
export default app;
