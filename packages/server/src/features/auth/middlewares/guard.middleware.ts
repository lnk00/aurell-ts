import type { Context, Next } from 'hono';
import type { Bindings } from '../../../bindings';
import { getCookie } from 'hono/cookie';
import { NotAuthenticatedError } from '../../core/types/errors.type';
import { getService } from '../../../libs/ioc.lib';

export const guardMiddleware = async (
	c: Context<{ Bindings: Bindings }>,
	next: Next,
) => {
	const sessionService = getService('session');
	const jwt = getCookie(c, 'stytch_session_jwt');

	if (!jwt) {
		throw new NotAuthenticatedError('No jwt found in cookies');
	}

	try {
		await sessionService.verifyJwt(jwt);
		return next();
	} catch {
		throw new NotAuthenticatedError('Could not validate the jwt token');
	}
};
