import { Hono } from 'hono';
import type { Bindings } from '../../..';

const coreHandlers = new Hono<{ Bindings: Bindings }>().get('/infos', (c) => {
	console.log(c.req.header());
	return c.json(
		{
			name: 'fiqo-api',
			version: '0.0.1',
		},
		200,
	);
});

export default coreHandlers;
