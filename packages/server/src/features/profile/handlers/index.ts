import { Hono } from 'hono';
import type { Bindings } from '../../../bindings';

const profileHandlers = new Hono<{ Bindings: Bindings }>().post(
	'/create',
	async (c) => {
		const { userId } = await c.req.parseBody();
		console.log(userId);
		return c.json(
			{
				userId,
			},
			200,
		);
	},
);

export default profileHandlers;
