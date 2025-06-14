import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { z } from 'zod/v4';
import { users } from '../../../libs/db/schemas/user.schema';
import { Validate } from '../../../libs/validator.lib';
import type { HonoContextType } from '../../../types/context.type';
import { guardMiddleware } from '../../auth/middlewares/guard.middleware';
import { DatabaseError } from '../../core/types/errors.type';

const schema = z.object({
	userId: z.string('userId is required in the request body'),
});

const profileHandlers = new Hono<HonoContextType>()
	.use('*', guardMiddleware)
	.post(
		'/create',
		validator('form', (value) => Validate(value, schema)),
		async (c) => {
			const { userId } = c.req.valid('form');

			try {
				const db = drizzle(c.env.DB);
				await db
					.insert(users)
					.values({ id: userId as string })
					.onConflictDoNothing();
			} catch (e) {
				throw new DatabaseError('Could not insert the new user in db');
			}

			return c.json(
				{
					userId,
				},
				200,
			);
		},
	);

export default profileHandlers;
