import { validator } from 'hono/validator';
import z from 'zod/v4';
import { setCookie } from '../../../../libs/cookie.lib';
import { factory } from '../../../../libs/factory.lib';
import { getService } from '../../../../libs/ioc.lib';
import { Validate } from '../../../../libs/validator.lib';

const orgSigninSchema = z.object({
	id: z.string('an id is required in the request body'),
	token: z.string('a token is required in the request body'),
});

export const orgSigninController = factory.createHandlers(
	validator('form', (value) => Validate(value, orgSigninSchema)),
	async (c) => {
		const orgService = getService('org');
		const { id, token } = c.req.valid('form');

		const { sessionToken, sessionJwt } = await orgService.signin(id, token);

		setCookie(c, 'aurell_session', sessionToken);
		setCookie(c, 'aurell_session_jwt', sessionJwt);

		return c.json({
			sessionToken,
			sessionJwt,
		});
	},
);
