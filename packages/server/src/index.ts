import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import { guardMiddleware } from './features/auth/middlewares/guard.middleware';
import openbankingHandlers from './features/bankaccount/handlers';
import coreHandlers from './features/core/handlers';
import { corsMiddleware } from './features/core/middlewares/cors.middleware';
import { serviceMiddleware } from './features/core/middlewares/service.middleware';
import profileHandlers from './features/profile/handlers';
import type { HonoContextType } from './types/context.type';

const app = new Hono<HonoContextType>();

app.use('*', serviceMiddleware);
app.use('*', corsMiddleware);
app.use('*', guardMiddleware);

app.onError((err, c) => {
	let status: ContentfulStatusCode = 500;
	if (err instanceof HTTPException) status = err.status;

	console.error({
		timestamp: new Date().toISOString(),
		error: err.message,
		stack: err.stack,
		path: c.req.path,
		method: c.req.method,
	});

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
	.route('/api/profile', profileHandlers)
	.route('/api/ob', openbankingHandlers);

export type AppType = typeof routes;
export default app;
