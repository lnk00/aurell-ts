import { Hono } from 'hono';
import type { Bindings } from '../../../bindings';
import { drizzle } from 'drizzle-orm/d1';
import { users } from '../../../libs/db/schemas/user.schema';

const profileHandlers = new Hono<{ Bindings: Bindings }>().post(
	'/create',
	async (c) => {
		const { userId } = await c.req.parseBody();

		const db = drizzle(c.env.DB);
		await db
			.insert(users)
			.values({ id: userId as string })
			.onConflictDoNothing();

		return c.json(
			{
				userId,
			},
			200,
		);
	},
);

export default profileHandlers;
