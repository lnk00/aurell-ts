import { Hono } from 'hono';
import type { HonoContextType } from '../../../types/context.type';

const coreHandlers = new Hono<HonoContextType>().get('/infos', async (c) => {
	return c.json(
		{
			name: 'aurell-api',
			version: '0.0.1',
		},
		200,
	);
});

export default coreHandlers;
