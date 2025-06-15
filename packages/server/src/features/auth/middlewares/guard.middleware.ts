import type { Context, Next } from 'hono';
import { getCookie } from 'hono/cookie';
import { getService } from '../../../libs/ioc.lib';
import type { HonoContextType } from '../../../types/context.type';
import { NotAuthenticatedError } from '../../core/types/errors.type';

export const guardMiddleware = async (
	c: Context<HonoContextType>,
	next: Next,
) => {
	const sessionService = getService('session');
	const jwt = getCookie(c, 'aurell_session_jwt');

	c.set('userId', null);
	c.set('sessionId', null);

	if (!jwt) {
		throw new NotAuthenticatedError('No jwt found in cookies');
	}

	try {
		const { userId, sessionId } = await sessionService.verifyJwt(jwt);

		if (sessionId && userId) {
			c.set('userId', userId);
			c.set('sessionId', sessionId);
		}

		return next();
	} catch {
		throw new NotAuthenticatedError('Could not validate the jwt token');
	}
};
