import { Hono } from 'hono';

const app = new Hono();

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
