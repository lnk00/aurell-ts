import type { Context, Next } from 'hono';
import * as stytch from 'stytch';
import type { Bindings } from '../../../bindings';
import { HTTPException } from 'hono/http-exception';
import { getCookie } from 'hono/cookie';

export const guardMiddleware = async (
	c: Context<{ Bindings: Bindings }>,
	next: Next,
) => {
	const jwt = getCookie(c, 'stytch_session_jwt');

	if (!jwt) {
		throw new HTTPException(401, { message: 'User not authenticated' });
	}

	const stytchClient = new stytch.Client({
		project_id: c.env.STYTCH_PROJECT_ID,
		secret: c.env.STYTCH_SECRET,
	});

	try {
		await stytchClient.sessions.authenticateJwt({
			session_jwt: jwt,
		});
		return next();
	} catch {
		throw new HTTPException(401, { message: 'User not authenticated' });
	}
};
