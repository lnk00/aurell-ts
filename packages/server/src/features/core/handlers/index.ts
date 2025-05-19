import { Hono } from 'hono';

const coreHandlers = new Hono().get('/infos', (c) =>
	c.json(
		{
			name: 'fiqo-api',
			version: '0.0.1',
		},
		200,
	),
);

export default coreHandlers;
