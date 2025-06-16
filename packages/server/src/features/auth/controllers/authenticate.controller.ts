import { getCookie } from '../../../libs/cookie.lib';
import { factory } from '../../../libs/factory.lib';
import { getService } from '../../../libs/ioc.lib';

export const authtenticateController = factory.createHandlers(async (c) => {
	let authenticated = false;
	const sessionService = getService('session');

	const jwt = getCookie(c, 'aurell_session_jwt');

	if (jwt) {
		const { sessionJwt } = await sessionService.verifyJwt(jwt);

		if (sessionJwt) {
			authenticated = true;
		}
	}

	return c.json({
		authenticated,
	});
});
