import { deleteCookie, getCookie } from '../../../libs/cookie.lib';
import { factory } from '../../../libs/factory.lib';
import { getService } from '../../../libs/ioc.lib';

export const signoutController = factory.createHandlers(async (c) => {
	const sessionService = getService('session');
	const sessionToken = getCookie(c, 'aurell_session');

	if (sessionToken) {
		await sessionService.signout(sessionToken);
		deleteCookie(c, 'aurell_session');
		deleteCookie(c, 'aurell_session_jwt');
	}

	return c.json({
		success: sessionToken !== undefined,
	});
});
