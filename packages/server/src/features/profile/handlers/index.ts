import { Hono } from 'hono';
import type { Bindings } from '../../../bindings';

const profileHandlers = new Hono<{ Bindings: Bindings }>().get(
	'/create',
	async (c) => {
		return c.json(
			{
				userId: 'sdsdsdshj',
			},
			200,
		);
	},
);

export default profileHandlers;
