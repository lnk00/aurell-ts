import { Hono } from 'hono';
import { corsMiddleware } from './features/core/middlewares/cors.middleware';

const app = new Hono();
app.use('*', corsMiddleware);

const routes = app.get('/api', (c) =>
	c.json(
		{
			name: 'fiqo-api',
			version: '0.0.1',
		},
		200,
	),
);

export type AppType = typeof routes;
export default app;
