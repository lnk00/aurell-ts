import { getCookie, setCookie } from '../../../libs/cookie.lib';
import { factory } from '../../../libs/factory.lib';
import { getService } from '../../../libs/ioc.lib';
import { NotAuthenticatedError } from '../../core/types/errors.type';

export const guardMiddleware = factory.createMiddleware(async (c, next) => {
	const sessionService = getService('session');
	const jwt = getCookie(c, 'aurell_session_jwt');

	c.set('userId', null);
	c.set('sessionId', null);

	if (!jwt) {
		throw new NotAuthenticatedError('No jwt found in cookies');
	}

	try {
		const { userId, sessionId, sessionJwt } =
			await sessionService.verifyJwt(jwt);

		if (sessionId && userId) {
			c.set('userId', userId);
			c.set('sessionId', sessionId);
			setCookie(c, 'aurell_session_jwt', sessionJwt);
		}

		return next();
	} catch {
		throw new NotAuthenticatedError('Could not validate the jwt token');
	}
});
