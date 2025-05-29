import { Hono } from 'hono';
import { corsMiddleware } from './features/core/middlewares/cors.middleware';
import coreHandlers from './features/core/handlers';
import type { Bindings } from './bindings';
import { guardMiddleware } from './features/auth/middlewares/guard.middleware';
import profileHandlers from './features/profile/handlers';
import { HTTPException } from 'hono/http-exception';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

const app = new Hono<{ Bindings: Bindings }>();
app.use('*', corsMiddleware);
app.use('*', guardMiddleware);
app.onError((err, c) => {
	let status: ContentfulStatusCode = 500;
	if (err instanceof HTTPException) status = err.status;

	return c.json(
		{
			success: false,
			error: {
				code: err.name,
				message: err.message,
			},
			timestamp: new Date().toISOString(),
		},
		status,
	);
});

const routes = app
	.route('/api/core', coreHandlers)
	.route('/api/profile', profileHandlers);

export type AppType = typeof routes;
export default app;
