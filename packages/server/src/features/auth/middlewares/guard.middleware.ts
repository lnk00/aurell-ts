import type { Context, Next } from 'hono';
import * as stytch from 'stytch';
import type { Bindings } from '../../../bindings';
import { HTTPException } from 'hono/http-exception';

export const guardMiddleware = async (
	c: Context<{ Bindings: Bindings }>,
	next: Next,
) => {
	const headers = c.req.header();

	const stytchClient = new stytch.Client({
		project_id: c.env.STYTCH_PROJECT_ID,
		secret: c.env.STYTCH_SECRET,
	});

	try {
		await stytchClient.sessions.authenticateJwt({
			session_jwt: headers.authorization.replace('Bearer ', ''),
		});
		return next();
	} catch {
		throw new HTTPException(401, { message: 'User not authenticated' });
	}
};
